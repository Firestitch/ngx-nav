'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Application documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/FsNavModule.html" data-type="entity-link">FsNavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FsNavModule-144ffafdb06154ab8c65f41f4dbddd2d"' : 'data-target="#xs-components-links-module-FsNavModule-144ffafdb06154ab8c65f41f4dbddd2d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FsNavModule-144ffafdb06154ab8c65f41f4dbddd2d"' :
                                            'id="xs-components-links-module-FsNavModule-144ffafdb06154ab8c65f41f4dbddd2d"' }>
                                            <li class="link">
                                                <a href="components/FsNavActionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FsNavActionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FsNavBackComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FsNavBackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FsNavBaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FsNavBaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FsNavComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FsNavComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FsNavMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FsNavMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FsNavSubtitleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FsNavSubtitleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FsNavSupertitleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FsNavSupertitleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FsNavTitleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FsNavTitleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FsNavActions.html" data-type="entity-link">FsNavActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/FsNavComponents.html" data-type="entity-link">FsNavComponents</a>
                            </li>
                            <li class="link">
                                <a href="classes/FsNavMenus.html" data-type="entity-link">FsNavMenus</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FsNavService.html" data-type="entity-link">FsNavService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FsNavStackService.html" data-type="entity-link">FsNavStackService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FsNavUpdatesService.html" data-type="entity-link">FsNavUpdatesService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/NavStackItem.html" data-type="entity-link">NavStackItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavUpdated.html" data-type="entity-link">NavUpdated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UrlInfoAction.html" data-type="entity-link">UrlInfoAction</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});