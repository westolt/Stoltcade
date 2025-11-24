const { test, describe, expect } = require('@playwright/test')

describe('Stoltcade', () => {
    test('front page can be opened', async ({ page }) => {
        await page.goto('http://localhost:5173')

        await expect(page.getByRole('link', {name: 'Stoltcade' })).toBeVisible()
        await expect(page.getByText('PeriodicPairs')).toBeVisible()
        await expect(page.getByText('Welcome to Stoltcade!')).toBeVisible()
    })
})
