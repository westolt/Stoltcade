const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Stoltcade', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        await expect(page.getByRole('link', {name: 'Stoltcade' })).toBeVisible()
        await expect(page.getByText('PeriodicPairs')).toBeVisible()
        await expect(page.getByText('Welcome to Stoltcade!')).toBeVisible()
    })

    test('game description is shown when hovering cursor over a game button', async ({ page }) => {
        const gameButton = page.getByRole('button', { name: 'PeriodicPairs' })
        await expect(gameButton).toBeVisible()
        await gameButton.hover()

        const description = page.getByText('A quiz game about the periodic table.')
        await expect(description).toBeVisible({ timeout: 3000 })
    })
})
