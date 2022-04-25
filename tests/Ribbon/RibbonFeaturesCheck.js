Feature ('Ribbon');

Scenario ('Ribbon features check - SideMenu, Logo, Seznam link',async ({I, Ribbon }) => {

    const URL = 'https://www.stream.cz/hledani';

    I.startCleanOnPage(URL);
    Ribbon.toggleSideMenu().displaySideMenuStreamPage();
    Ribbon.displayHomePage();
    Ribbon.checkSeznamPageView();

});
