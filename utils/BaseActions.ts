import test, { expect, Locator, Page } from '@playwright/test';

export class BaseActions {
	constructor(readonly page: Page) {}

	/**
	 * This method clicks on a element using its Locator with step tracking.
	 * Ensures the element is visible before clicking on it.
	 * @param locator - Locator of the element.
	 * @param elementName - Name of the element for logging in report.
	 * @param timeout - Time to wait for element to be visible.
	 */
	async clickOnElement(
		locator: Locator,
		elementName: string,
		timeout: number
	): Promise<void> {
		try {
			await test.step(`Click on element [${elementName}]`, async () => {
				console.log(`Attempting to click on element [${elementName}]`);
				await expect(locator).toBeVisible({ timeout: timeout });
				await locator.click();
				console.log(`Successfully clicked on [${elementName}]`);
			});
		} catch (error) {
			console.error(
				`Failed to click on element [${elementName}], with locator [${locator}]. Error: ${error.message}`
			);
			throw new Error(
				`Error clicking on element: [${elementName}]. Stack trace: ${error.stack}`
			);
		}
	}

	/**
	 * This method enter the text into the element with step tracking.
	 * Ensures the element is visible before entering the text.
	 * @param locator - Locator of the element.
	 * @param text - Text to enter in element.
	 * @param elementName - Name of the element for logging in report.
	 * @param timeout - Wait for element to be visible.
	 */
	async enterTextInElement(
		locator: Locator,
		text: string,
		elementName: string,
		timeout: number
	): Promise<void> {
		try {
			await test.step(`Enter text in element ${elementName} with locator [${locator}]`, async () => {
				console.log(`Attempting to enter text in element [${elementName}]`);
				await expect(locator).toBeVisible({ timeout: timeout });
				console.log(`Entering [${text}] into [${elementName}] element`);
				await locator.fill(text);
				console.log(`Successfully entered text into [${elementName}]`);
			});
		} catch (error) {
			console.error(
				`Failed to enter text into element [${elementName}] with locator: [${locator}]. Error: [${error.message}]`
			);
			throw new Error(
				`Error entering text in element [${elementName}]. Stack trace: [${error.stack}]`
			);
		}
	}

	/**
	 * This method selects an option from a dropdown element using a Locator.
	 * Ensures the dropdown is visible before selecting the desired option.
	 * @param dropdownLocator - Locator of the dropdown element.
	 * @param optionValue - The value attribute of the option to select.
	 * @param timeout - The wait time for dropdown to be visible.
	 */
	async selectOptionFromDropdown(
		dropdownLocator: Locator,
		optionValue: string,
		timeout: number
	): Promise<void> {
		try {
			await test.step(`Select option [${optionValue}] from dropdown with locator [${dropdownLocator}]`, async () => {
				console.log(
					`Attempting to select option [${optionValue}] from dropdown`
				);
				await expect(dropdownLocator).toBeVisible({ timeout: timeout });
				await dropdownLocator.selectOption(optionValue);
				console.log(`Successfully selected option [${optionValue}]`);
			});
		} catch (error) {
			console.error(
				`Failed to select option [${optionValue}]. Error: ${error.message}`
			);
			throw new Error(
				`Error selecting option [${optionValue}] from dropdown. Stack trace: ${error.stack}`
			);
		}
	}

	/**
	 * This method retrieves and returns the trimmed text content of a given element.
	 * Ensures the element is visible before attempting to access its content.
	 * @param locator - Locator of the element whose text is to be retrieved.
	 * @param timeout - Wait time for element to be visible.
	 * @returns A `Promise<string>` that resolves to the trimmed text content of the element.
	 */
	async getElementText(locator: Locator, timeout: number): Promise<string> {
		try {
			await expect(locator).toBeVisible({ timeout: timeout });
			const text = await locator.textContent();
			if (!text) {
				throw new Error(
					`Text content not found for element with locator [${locator}].`
				);
			}
			console.log(
				`Returned text from element with locator [${locator}]: [${text.trim()}]`
			);
			return text.trim();
		} catch (error) {
			console.error(
				`Failed to get text from element with locator [${locator}]. Error: [${error.message}]`
			);
			throw new Error(
				`Error retrieving text from element with locator [${locator}]. Stack trace: [${error.stack}]`
			);
		}
	}
}
