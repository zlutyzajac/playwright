const {I} = inject();

module.exports = {
    root: '$ribbon',
    locators: {
        content: {
            hamburgerButton: '//*[@id="app"]/div/div/div[1]/div/header/button',
            sideMenu: '$hamburger_menu',
            streamOriginalsLink: '$originals-link'
        },
        start: {
            logoStream: '$logo-home-link',
        },
        center: {
            searchField: '$search-input',
            searchButton: '$search-submit',
            searchClearButton: '$search-clear'
        },
        end: {
            emailButton: '$button-email',
            bubbleButton: '$button-bubble',
            loginLink: '$login-badge',
            seznamLink: '$seznam-link'
        }
    },

    toggleSideMenu() {
        within(this.root, () => {
            I.click(this.locators.content.hamburgerButton);
            I.waitForVisible(this.locators.content.sideMenu, 5);
        });
        return this;
    },

    displaySideMenuStreamPage() {
        within(this.root, () => {
            I.click(this.locators.content.streamOriginalsLink);
        });
        I.seeInCurrentUrl('/sluzba/stream');
        return this;
    },

    clickOnLogo() {
        within(this.root, () => {
            I.click(this.locators.start.logoStream);
        });
        return this;
    },

    displayHomePage() {
        this.clickOnLogo();
        I.seeCurrentUrlEquals('https://www.stream.cz/');
        return this;
    },

    searchValue(searchInputValue) {
        I.fillField(this.locators.center.searchField, searchInputValue);
        I.click(this.locators.center.searchButton);
        return this;
    },

    clearSearchField() {
        // I.clearField(this.locators.center.searchField);
        I.click(this.locators.center.searchClearButton);
        return this;
    },

    displaySeznamPage() {
        within(this.root, () => {
            I.click(this.locators.end.seznamLink);
        });
        I.wait(10);
        I.switchToNextTab();
        I.seeInCurrentUrl('https://www.seznam.cz/');
        return this;
    },

    returnToStreamTab() {
        I.switchToPreviousTab();
        I.closeOtherTabs();
        return this;
    },

    checkSeznamPageView() {
        this.displaySeznamPage().returnToStreamTab();
    }
};
