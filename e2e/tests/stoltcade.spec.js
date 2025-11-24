const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Stoltcade', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Stoltcade' })).toBeVisible()
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

    test('game is opened when game button is clicked', async ({ page }) => {
        const gameButton = page.getByRole('button', { name: 'PeriodicPairs' })
        await expect(gameButton).toBeVisible()
        await gameButton.click()

        const how_to_play = page.getByText('Type the full name of the chemical element that matches the symbol shown on the screen and click Submit.')
        await expect(how_to_play).toBeVisible({ timeout: 10000 })
    })

    test('navigate back to front page from play page after clicking Stoltcade header', async ({ page }) => {
        const gameButton = page.getByRole('button', { name: 'PeriodicPairs' })
        await expect(gameButton).toBeVisible()
        await gameButton.click()

        const how_to_play = page.getByText('Type the full name of the chemical element that matches the symbol shown on the screen and click Submit.')
        await expect(how_to_play).toBeVisible({ timeout: 10000 })

        const header = page.getByRole('link', { name: 'Stoltcade' })
        await expect(header).toBeVisible()
        await header.click()

        const welcome = page.getByText('Welcome to Stoltcade!')
        await expect(welcome).toBeVisible({ timeout: 10000 })
    })
})
