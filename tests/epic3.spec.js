import { test, expect } from '@playwright/test';

const URL = 'http://localhost:3000' || 'Your deployed URL here if not running locally';

console.log(`Testing against URL: ${URL}`);

test.describe.configure({ mode: 'serial' });

test.describe('Company Account Creation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Manage Companies Register new' }).click();
    await page.getByRole('link', { name: 'Create Company Account' }).click();
  });

  test('Create Company Account', async ({ page }, testInfo) => {
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).click();
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).fill('Playwright - ' + testInfo.project.name);
    await page.getByRole('textbox', { name: 'company@example.com' }).click();
    await page.getByRole('textbox', { name: 'company@example.com' }).fill(`playwright-${testInfo.project.name}@example.com`);
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).click();
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).fill('01-234-5678');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('123456');
    await page.locator('input[name="confirmPassword"]').click();
    await page.locator('input[name="confirmPassword"]').fill('123456');
      page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });

    await page.getByRole('button', { name: 'Create Company Account' }).click();
    await expect(page.getByText(`UnpublishedPlaywright - ${testInfo.project.name}`)).toBeVisible();
  });

  test('Create Company Account With Invalid Email', async ({ page }, testInfo) => {
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).click();
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).fill('Playwright - ' + testInfo.project.name);
    await page.getByRole('textbox', { name: 'company@example.com' }).click();
    await page.getByRole('textbox', { name: 'company@example.com' }).fill('invalid-email');
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).click();
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).fill('01-234-5678');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('123456');
    await page.locator('input[name="confirmPassword"]').click();
    await page.locator('input[name="confirmPassword"]').fill('123456');
      page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Create Company Account' }).click();
  });

  test('Create Company Account With Invalid Password', async ({ page }, testInfo) => {
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).click();
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).fill('Playwright - ' + testInfo.project.name);
    await page.getByRole('textbox', { name: 'company@example.com' }).click();
    await page.getByRole('textbox', { name: 'company@example.com' }).fill(`playwright-${testInfo.project.name}@example.com`);
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).click();
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).fill('01-234-5678');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('12345');
    await page.locator('input[name="confirmPassword"]').click();
    await page.locator('input[name="confirmPassword"]').fill('12345');
      page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Create Company Account' }).click();
  });

  test('Create Company Account With Duplicate Email', async ({ page }, testInfo) => {
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).click();
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).fill('Playwright - ' + testInfo.project.name);
    await page.getByRole('textbox', { name: 'company@example.com' }).click();
    await page.getByRole('textbox', { name: 'company@example.com' }).fill(`playwright-${testInfo.project.name}@example.com`);
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).click();
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).fill('01-234-5678');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('123456');
    await page.locator('input[name="confirmPassword"]').click();
    await page.locator('input[name="confirmPassword"]').fill('123456');
      page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Create Company Account' }).click();
    await expect(page.locator('div').filter({ hasText: /^Failed to create company account$/ })).toBeVisible();
  });

  test('Create Company Account With Empty Fields', async ({ page }, testInfo) => {
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).click();
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).fill('Playwright - ' + testInfo.project.name);
    await page.getByRole('textbox', { name: 'company@example.com' }).click();
    await page.getByRole('textbox', { name: 'company@example.com' }).fill('');
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).click();
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).fill('01-234-5678');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('123456');
    await page.locator('input[name="confirmPassword"]').click();
    await page.locator('input[name="confirmPassword"]').fill('123456');
      page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Create Company Account' }).click();

    await expect(page.getByRole('textbox', { name: 'company@example.com' }))
      .toHaveJSProperty('validity.valueMissing', true);
  });

  test('Create Company Account With Mismatched Passwords', async ({ page }, testInfo) => {
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).click();
    await page.getByRole('textbox', { name: 'e.g. Google Thailand' }).fill('Playwright - ' + testInfo.project.name);
    await page.getByRole('textbox', { name: 'company@example.com' }).click();
    await page.getByRole('textbox', { name: 'company@example.com' }).fill(`playwright-${testInfo.project.name}@example.com`);
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).click();
    await page.getByRole('textbox', { name: '-XXX-XXXX' }).fill('01-234-5678');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('123456');
    await page.locator('input[name="confirmPassword"]').click();
    await page.locator('input[name="confirmPassword"]').fill('654321');
      page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Create Company Account' }).click();
    await expect(page.locator('div').filter({ hasText: /^Passwords do not match\. Please try again\.$/ })).toBeVisible();
  });
});

test.describe('Company View Information', () => {
  test('View Company Information', async ({ page }, testInfo) => {
    await page.goto(URL);
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill(`playwright-${testInfo.project.name}@example.com`);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.locator('h2')).toContainText('Playwright - ' + testInfo.project.name);
    await expect(page.getByRole('switch')).not.toBeChecked();
    await expect(page.getByRole('main')).toContainText('Address not provided');
    await expect(page.getByRole('main')).toContainText('No description available.');
    await expect(page.getByRole('main')).toContainText('Website-');
    await expect(page.getByRole('main')).toContainText('Telephone01-234-5678');
  });
});

test.describe('Company Edit Information', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(URL);
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill(`playwright-${testInfo.project.name}@example.com`);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });

  test('Edit Company Information', async ({ page }, testInfo) => {
    await expect(page.getByText(`Playwright - ${testInfo.project.name}Address not providedPublicEdit InfoCompany DetailsNo`)).toContainText('Playwright - ' + testInfo.project.name + 'Address not providedPublicEdit InfoCompany DetailsNo description available.Website-Telephone01-234-5678Delete Account');
    await page.getByRole('link', { name: 'Edit Info' }).click();
    await page.locator('input[name="address"]').click();
    await page.locator('input[name="address"]').fill('Playwright Address');
    await page.locator('input[name="website"]').click();
    await page.locator('input[name="website"]').fill('playwright.com');
    await page.locator('input[name="website"]').press('ArrowLeft');
    await page.locator('textarea[name="description"]').click();
    await page.locator('textarea[name="description"]').fill('Playwright Description');
    await page.locator('input[name="tel"]').click();
    await page.locator('input[name="tel"]').fill('09-876-5432');
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill('Playwright - ' + testInfo.project.name + ' Edit');
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.waitForResponse(resp => 
      resp.url().includes('/api/v1/companies') && resp.status() === 200
    );
    await expect(page.getByText(`Playwright - ${testInfo.project.name} EditPlaywright AddressPublicEdit InfoCompany`)).toContainText(`Playwright - ${testInfo.project.name} EditPlaywright AddressPublicEdit InfoCompany DetailsPlaywright DescriptionWebsiteplaywright.comTelephone09-876-5432Delete Account`);
  });

  test('Edit Company Information With Empty Fields', async ({ page }, testInfo) => {
    await page.getByRole('link', { name: 'Edit Info' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill('');
    await page.locator('input[name="address"]').click();
    await page.locator('input[name="address"]').fill('');
    await page.locator('input[name="website"]').click();
    await page.locator('input[name="website"]').fill('');
    await page.locator('textarea[name="description"]').click();
    await page.locator('textarea[name="description"]').fill('');
    await page.locator('input[name="tel"]').click();
    await page.locator('input[name="tel"]').fill('');
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Save Changes' }).click();

    await expect(page.locator('input[name="name"]'))
      .toHaveJSProperty('validity.valueMissing', true);
  });
});

test.describe('Published Company Account', () => {
  test('Published Company Account', async ({ page }, testInfo) => {
    // Login with unpublished company account
    await page.goto(URL);
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill(`playwright-${testInfo.project.name}@example.com`);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByRole('switch')).not.toBeChecked();
    await page.waitForTimeout(100);
    await page.goto(`${URL}/companies`);
    await expect(page.getByText(`🏢 Your CompanyPlaywright - ${testInfo.project.name}`)).not.toBeVisible();
    
    await page.getByRole('link', { name: 'Logo JobFair' }).click();
    await page.getByRole('switch').check();
    await expect(page.getByRole('switch')).toBeChecked();
    await page.waitForResponse(resp => 
      resp.url().includes('/api/v1/companies') && resp.status() === 200
    );
    await page.goto(`${URL}/companies`);
    await expect(page.getByText(`🏢 Your CompanyPlaywright - ${testInfo.project.name}`)).toBeVisible();
    
    await page.getByRole('link', { name: 'Logo JobFair' }).click();
    await page.getByRole('switch').uncheck();
    await expect(page.getByRole('switch')).not.toBeChecked();
    await page.waitForResponse(resp => 
      resp.url().includes('/api/v1/companies') && resp.status() === 200
    );
    await page.goto(`${URL}/companies`);
    await expect(page.getByText(`🏢 Your CompanyPlaywright - ${testInfo.project.name}`)).not.toBeVisible();
  });
});

test.describe('Company Delete Account', () => {
  test('Delete Company Account', async ({ page }, testInfo) => {
    // Login with company account
    await page.goto(URL);
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill(`playwright-${testInfo.project.name}@example.com`);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForResponse(resp => 
      resp.url().includes('/api/auth') && resp.status() === 200
    );

    // Delete company account
    await page.getByRole('button', { name: 'Delete Account' }).click();
    await page.getByRole('checkbox', { name: 'I understand this action is' }).check();
    await page.getByRole('button', { name: 'Yes, Delete' }).click();

    await page.waitForTimeout(100);

    
    // Login with admin account to check if company is deleted
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForResponse(resp => 
      resp.url().includes('/api/auth') && resp.status() === 200
    );

    await expect(page.getByText('Admin Command Center')).toBeVisible();
    
    // Check User Management to confirm company deletion
    await page.goto(`${URL}/admin/manage-users`);
    await page.getByRole('textbox', { name: 'Search by User Name or Email' }).click();
    await page.getByRole('textbox', { name: 'Search by User Name or Email' }).fill(`playwright - ${testInfo.project.name}`);
    await expect(page.getByText('No users found.Try adjusting')).toBeVisible();
    
    //Check Company Management to confirm company deletion
    await page.goto(`${URL}/admin/manage-companies`);
    await page.waitForResponse(resp => 
      resp.url().includes('/companies') && resp.status() === 200
    );
    await expect(page.getByText(`Playwright - ${testInfo.project.name}`)).not.toBeVisible();

    // Sign out admin account
    await page.getByRole('link', { name: 'Sign-Out' }).click();
    await page.getByRole('button', { name: 'Yes, Sign Out' }).click();

    // Sign in with deleted company account
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill(`playwright-${testInfo.project.name}@example.com`);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForResponse(resp => 
      resp.url().includes('/api/auth') && resp.status() !== 200
    );
    await expect(page.getByText('Invalid email or password.')).toBeVisible();
  });
});