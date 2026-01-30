# Configuration
$baseUrl = "http://localhost:3000/api"
$adminEmail = "admin_test_$(Get-Random)@test.com"
$userEmail = "user_test_$(Get-Random)@test.com"
$password = "Password123!"

function Test-Endpoint {
    param($Name, $Method, $Url, $Body, $Token, $ExpectedStatus)
    Write-Host "Testing: $Name..." -NoNewline
    
    $headers = @{ "Content-Type" = "application/json" }
    if ($Token) { $headers["Authorization"] = "Bearer $Token" }
    
    try {
        $params = @{
            Uri = $Url
            Method = $Method
            Headers = $headers
            ErrorAction = "Stop"
        }
        if ($Body) { $params["Body"] = ($Body | ConvertTo-Json -Depth 5) }
        
        $response = Invoke-RestMethod @params
        Write-Host " [OK]" -ForegroundColor Green
        return $response
    } catch {
        $ex = $_.Exception
        if ($ex.Response) {
             $statusCode = $ex.Response.StatusCode.value__
             if ($statusCode -eq $ExpectedStatus) {
                  Write-Host " [OK] (Expected Error $statusCode)" -ForegroundColor Green
                  return $null
             }
             Write-Host " [FAILED] Status: $statusCode" -ForegroundColor Red
             Write-Host "Error Details: " 
             $reader = New-Object System.IO.StreamReader($ex.Response.GetResponseStream())
             $responseBody = $reader.ReadToEnd()
             Write-Host $responseBody
        } else {
             Write-Host " [FAILED] Connection Error: $($ex.Message)" -ForegroundColor Red
        }
        return $null
    }
}

# 1. Register Admin
$adminBody = @{ name = "Admin User"; email = $adminEmail; password = $password; role = "admin" }
Test-Endpoint -Name "Register Admin" -Method Post -Url "$baseUrl/auth/register" -Body $adminBody

# 2. Login Admin
$loginBody = @{ email = $adminEmail; password = $password }
$adminAuth = Test-Endpoint -Name "Login Admin" -Method Post -Url "$baseUrl/auth/login" -Body $loginBody
$adminToken = $adminAuth.token

# 3. Register Customer
$userBody = @{ name = "Customer User"; email = $userEmail; password = $password; role = "customer" }
Test-Endpoint -Name "Register Customer" -Method Post -Url "$baseUrl/auth/register" -Body $userBody

# 4. Login Customer
$userAuth = Test-Endpoint -Name "Login Customer" -Method Post -Url "$baseUrl/auth/login" -Body $loginBody
$userToken = $userAuth.token

if (-not $adminToken -or -not $userToken) { Write-Error "Authentication failed, stopping tests."; exit }

# 5. Create Menu Item (Admin)
$menuItemBody = @{
    title = "Test Burger"
    description = "Delicious burger"
    price = 15.99
    category = "main"
    available = $true
}
$newItem = Test-Endpoint -Name "Create Menu Item (Admin)" -Method Post -Url "$baseUrl/menu" -Body $menuItemBody -Token $adminToken
$menuItemId = $newItem._id

# 6. Get Menu (Public)
$menu = Test-Endpoint -Name "Get Menu" -Method Get -Url "$baseUrl/menu" 
if ($menu.Count -gt 0) { Write-Host "   -> Found $($menu.Count) items" -ForegroundColor Gray }

# 7. Create Order (Customer)
if ($menuItemId) {
    $orderBody = @{
        items = @(
            @{ menuItemId = $menuItemId; quantity = 2 }
        )
    }
    $order = Test-Endpoint -Name "Create Order (Customer)" -Method Post -Url "$baseUrl/orders" -Body $orderBody -Token $userToken
    $orderId = $order._id
}

# 8. Get User Orders (Customer)
Test-Endpoint -Name "Get Customer Orders" -Method Get -Url "$baseUrl/orders/me" -Token $userToken

# 9. Get All Orders (Admin)
Test-Endpoint -Name "Get All Orders (Admin)" -Method Get -Url "$baseUrl/orders" -Token $adminToken

# 10. Update Order Status (Admin)
if ($orderId) {
    $statusBody = @{ status = "preparing" }
    Test-Endpoint -Name "Update Order Status (Admin)" -Method Patch -Url "$baseUrl/orders/$orderId/status" -Body $statusBody -Token $adminToken
}

# 11. Delete Menu Item (Admin)
if ($menuItemId) {
    Test-Endpoint -Name "Delete Menu Item (Admin)" -Method Delete -Url "$baseUrl/menu/$menuItemId" -Token $adminToken
}

Write-Host "`nAll tests completed."
