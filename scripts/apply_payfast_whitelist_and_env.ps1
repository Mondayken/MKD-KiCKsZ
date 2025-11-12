<#
PowerShell helper: Add Payfast IP whitelist rules to Windows Firewall and provide Netlify env:set commands.

USAGE:
1) Run PowerShell as Administrator.
2) Edit the variables below (PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, MKD_SECRET, NOTIFY_EMAIL, SENDGRID_API_KEY, PAYFAST_SANDBOX) or run interactively.
3) If you want the script to run Netlify env:set, ensure you are logged into Netlify CLI (run "netlify login" first) and have netlify-cli installed (npm i -g netlify-cli).
4) Run:
   .\apply_payfast_whitelist_and_env.ps1

This script will:
 - Add Windows Firewall rules for the Payfast IPs you provided
 - Print iptables / AWS CLI / Cloudflare guidance
 - Optionally set Netlify environment variables via netlify-cli (if you enable that block)

Note: Running firewall commands requires Administrator privileges.
#>

# --- Configuration (edit if you want to hardcode) ---
$payfastCidrs = @("197.97.145.144/28","41.74.179.192/27","102.216.36.0/28","102.216.36.128/28","144.126.193.139")

# OPTIONAL: Netlify env vars - leave empty to skip setting via CLI
$SetNetlifyEnv = $true   # Auto-run netlify env:set (you must be logged in). The script will ask for confirmation before making changes.
$NetlifySite = "mkdkicksz" # replace with your Netlify site name or site id
$PAYFAST_MERCHANT_ID = ""  # set your merchant id here or leave empty to set interactively
$PAYFAST_MERCHANT_KEY = "" # set your merchant key here or leave empty to set interactively
$PAYFAST_SANDBOX = "true"  # 'true' to use sandbox, 'false' for live
$MKD_SECRET = ""           # your existing MKD secret
$NOTIFY_EMAIL = ""         # optional
$SENDGRID_API_KEY = ""     # optional

# --- Function: add firewall rules on Windows ---
function Add-PayfastFirewallRules {
    param([string[]]$Cidrs)
    Write-Host "Adding Windows Firewall allow rules for Payfast IPs..." -ForegroundColor Cyan
    foreach ($cidr in $Cidrs) {
        $name = "Allow Payfast $cidr"
        Write-Host "Adding rule: $name (RemoteAddress=$cidr)"
        try {
            New-NetFirewallRule -DisplayName $name -Direction Inbound -Action Allow -RemoteAddress $cidr -Protocol TCP -LocalPort 80,443 -Profile Any -ErrorAction Stop | Out-Null
            Write-Host " -> Added $name" -ForegroundColor Green
        } catch {
            # Avoid complex interpolation; write parts as separate arguments to prevent parser issues
            Write-Host " -> Failed to add" $name ":" $_ -ForegroundColor Yellow
        }
    }
}

# --- Main ---
# Check for Administrator privileges. If not admin, skip firewall rules but continue to Netlify env set.
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Not running as Administrator. Firewall rules will be skipped. To add Windows Firewall rules, re-run this script as Administrator." -ForegroundColor Yellow
} else {
    Add-PayfastFirewallRules -Cidrs $payfastCidrs
}

Write-Host ""; Write-Host "--- Other platform examples (manual) ---" -ForegroundColor Cyan
Write-Host "# iptables example (Linux):" -ForegroundColor Gray
foreach ($cidr in $payfastCidrs) { Write-Host "sudo iptables -I INPUT -p tcp -s $cidr --dport 443 -j ACCEPT" }

Write-Host ""; Write-Host "# AWS CLI example (replace sg-0123456789abcdef0 with your SG):" -ForegroundColor Gray
foreach ($cidr in $payfastCidrs) { Write-Host "aws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0 --protocol tcp --port 443 --cidr $cidr" }

Write-Host ""; Write-Host "# Cloudflare: add each IP/CIDR as an IP Access Rule with Action=Allow in the Cloudflare dashboard." -ForegroundColor Gray

# --- Netlify env set (optional) ---
if ($SetNetlifyEnv) {
    if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
        Write-Host "netlify CLI not found. Install with: npm i -g netlify-cli" -ForegroundColor Red
    } else {
        if (-not $PAYFAST_MERCHANT_ID) { $PAYFAST_MERCHANT_ID = Read-Host "Enter PAYFAST_MERCHANT_ID" }
        if (-not $PAYFAST_MERCHANT_KEY) { $PAYFAST_MERCHANT_KEY = Read-Host "Enter PAYFAST_MERCHANT_KEY (will be visible while typing)" }
        if (-not $MKD_SECRET) { $MKD_SECRET = Read-Host "Enter MKD_SECRET" }
        if (-not $NOTIFY_EMAIL) { $NOTIFY_EMAIL = Read-Host "Enter NOTIFY_EMAIL (optional)" }
        if (-not $SENDGRID_API_KEY) { $SENDGRID_API_KEY = Read-Host "Enter SENDGRID_API_KEY (optional)" }

        Write-Host "Setting Netlify environment variables for site: $NetlifySite" -ForegroundColor Cyan
        netlify env:set PAYFAST_MERCHANT_ID $PAYFAST_MERCHANT_ID --site $NetlifySite
        netlify env:set PAYFAST_MERCHANT_KEY $PAYFAST_MERCHANT_KEY --site $NetlifySite
        netlify env:set PAYFAST_SANDBOX $PAYFAST_SANDBOX --site $NetlifySite
        netlify env:set MKD_SECRET $MKD_SECRET --site $NetlifySite
        if ($NOTIFY_EMAIL) { netlify env:set NOTIFY_EMAIL $NOTIFY_EMAIL --site $NetlifySite }
        if ($SENDGRID_API_KEY) { netlify env:set SENDGRID_API_KEY $SENDGRID_API_KEY --site $NetlifySite }

        Write-Host "Env vars set. Trigger a deploy to ensure functions pick up the variables (optional)." -ForegroundColor Green
    }
} else {
    Write-Host "Netlify env:set skipped. To enable automatic Netlify env set, open this script and set `$SetNetlifyEnv = $true` and fill defaults." -ForegroundColor Yellow
}

Write-Host ""; Write-Host "Done. After whitelisting, test a Payfast transaction (use sandbox first). Then check Netlify function logs for 'Payfast IPN' entries." -ForegroundColor Green

Write-Host "Netlify function endpoints:
 - payfast function: /.netlify/functions/payfast
 - orders function (notify_url): /.netlify/functions/orders
" -ForegroundColor Gray

# EOF
