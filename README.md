# Playwright
Seznam úkolu:
- Požádání o přistup do tohoto repa
- Seznámení se s knihovnou [Playwright](https://playwright.dev) pro end to end testování
- Nainicializování základní konfigurace a závislostí pro spouštění prvních testů pomocí [dokumentace](https://playwright.dev/docs/intro)
- Vytvoření souboru či více, které budou obsahovat testy, pokrývající následující testové scénáře
- Push veškerých vytvořených souborů

Testové scénáře:
- Příchod na Hlavní stránku a vyhledání výrazu `Kazma`, kontrola přesměrování a existence neprázdných výsledků (Nejlepší výsledek, Pořady, Videa)
- Vyhledání neexistujícího výrazu, např. `abcdsuperbullshit42` a kontrola vypsání upozorńující hlášky, že jsme nic nenašli
- Příchod na stránku vyhledávání a kontrola obsahu, že již neobshauje nějaké výsledky
- Zahledání z libovolné stránky výrazu `Kazma`, kontrola existence videí, klik na Načtení dalších položek a kontrola zdali načtení proběhlo správně a položky přibyli
- Libovolný test funkcionality filtrování výpisu videí. Nad seznamem videí máme Tlačítko `Filtry`, které vyroluje možnosti filtrace (jde nám o akci, nikoliv programtockou kontrolu jestli jsou položky správně seřazené)


Možné problémy a tipy:
- **Debugování:** Pro debugování doporučujeme využívat [Trace Viewer](https://playwright.dev/docs/trace-viewer). Testy se ve výchozím stavu spouští v tzv. `headless` režimu, zjednodušeně řečeno pouze v terminálu. Testy lze zapnout i [mimo](https://playwright.dev/docs/debug#run-in-headed-mode) `headless` režim a rovnou vidět potřebné kroky (`{ headless: false, slowMo: 100 }`).
- **Stabilita testů:** Napsání stabilních testů není úplně triviální, záleží na prostředí, ve kterém se testy spouští, prohlížeč, stroj, typ stránky atd. Často pomůže [zvýšení timeoutů](https://playwright.dev/docs/test-timeouts#test-timeout) či spouštět neúspešný test s více [opakováním](https://playwright.dev/docs/test-retries#retries).
- **CMP dialog:** e2e testy se v základu tváří jako nepřihlášený uživatel. Na stremu aktuálně máme modal, který se zobrazuje po pár sekundách uživateli a chce zakliknout jeho uživatelské preference kvůli různému sledování. Tento modal může blokovat další akce e2e testů a nelze deterministicky určit, kdy se zobrazí. Řešením může být zamezení jeho zobrazení, pokud správně nastavíme cookies ještě před příchodem na dannou stránku. Pro nastavení cookies využij [BrowserContext](https://playwright.dev/docs/api/class-browsercontext#browser-context-add-cookies).
```jsx
const CMP_COOKIES: Cookie[] = [
	{
		name: "euconsent-v2", // TCF string v2
		value: "CPWQiJUPWQiJUD3ACBCSCHCsAP_AAEPAAATIIDoBhCokBSFCAGpYIIMAAAAHxxAAYCACABAAoAABABIAIAQAAAAQAAAgBAAAABQAIAIAAAAACEAAAAAAAAAAAQAAAAAAAAAAIQIAAAAAACBAAAAAAABAAAAAAABAQAAAggAAAAIAAAAAAAEAgAAAAAAAAAAAAAAAAAgAAAAAAAAAAAgd1AmAAWABUAC4AGQAQAAyABoADmAIgAigBMACeAFUAMQAfgBCQCIAIkARwAnABSgCxAGWAM0AdwA_QCEAEWALQAXUAwIBrAD5AJBATaAtQBeYDSgGpgO6AAAA.YAAAAAAAAAAA",
		domain: ".stream.cz",
		path: "/",
		expires: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // next month in secs
		secure: true,
		sameSite: "None",
		httpOnly: false,
	},
	{
		name: "cmppersisttestcookie", // unix timestamp of first visit, yup could be 1
		value: "1",
		domain: ".stream.cz",
		path: "/",
		expires: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
		secure: true,
		sameSite: "None",
		httpOnly: false,
	},
	{
		name: "szncmpone", // some helper to track purpose1 consent
		value: "1",
		domain: ".stream.cz",
		path: "/",
		expires: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
		secure: true,
		sameSite: "None",
		httpOnly: false,
	},
];
```
