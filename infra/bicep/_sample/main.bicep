// Test Bicep file for scoring validation
targetScope = 'resourceGroup'

@description('Environment name')
param environment string = 'dev'

@description('Project name')
param projectName string = 'freshconnect'

@description('Location for resources')
param location string = resourceGroup().location

@description('Owner for tagging')
param owner string = 'test-team'

var uniqueSuffix = uniqueString(resourceGroup().id)

// Tags
var tags = {
  Environment: environment
  ManagedBy: 'Bicep'
  Project: projectName
  Owner: owner
}

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: 'asp-${projectName}-${environment}-${location}'
  location: location
  tags: tags
  sku: {
    name: 'P1v3'
    tier: 'PremiumV3'
  }
  properties: {
    reserved: true
  }
}

// App Service
resource appService 'Microsoft.Web/sites@2022-09-01' = {
  name: 'app-${projectName}-${environment}-${take(uniqueSuffix, 6)}'
  location: location
  tags: tags
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
    }
  }
  identity: {
    type: 'SystemAssigned'
  }
}

// Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'st${projectName}${environment}${take(uniqueSuffix, 6)}'
  location: location
  tags: tags
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
}

// Key Vault
resource keyVault 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: 'kv-${take(projectName, 8)}-${environment}-${take(uniqueSuffix, 6)}'
  location: location
  tags: tags
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    enableRbacAuthorization: true
  }
}

output appServiceUrl string = 'https://${appService.properties.defaultHostName}'
output storageAccountName string = storageAccount.name
output keyVaultName string = keyVault.name
