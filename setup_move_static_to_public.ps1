# PowerShell script to move static files to public folder for Vercel deployment

# Create public folder if it doesn't exist
if (-Not (Test-Path -Path ".\\public")) {
    New-Item -ItemType Directory -Path ".\\public"
}

# Move HTML files
Get-ChildItem -Path . -Filter *.html | ForEach-Object { Move-Item $_.FullName -Destination ".\\public" }

# Move CSS files
Get-ChildItem -Path . -Filter *.css | ForEach-Object { Move-Item $_.FullName -Destination ".\\public" }

# Move JS files except api folder
Get-ChildItem -Path . -Filter *.js | ForEach-Object { 
    if ($_.FullName -notmatch "api") {
        Move-Item $_.FullName -Destination ".\\public"
    }
}

# Move images folder
if (Test-Path -Path ".\\images") {
    Move-Item -Path ".\\images" -Destination ".\\public"
}

# Move products.json if it exists
if (Test-Path -Path ".\\products.json") {
    Move-Item -Path ".\\products.json" -Destination ".\\public"
}

Write-Output "Static files moved to public/ folder. Please commit and redeploy."
