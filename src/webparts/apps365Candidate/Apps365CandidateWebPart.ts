import { Placeholder, IPlaceholderProps } from "@pnp/spfx-controls-react/lib/Placeholder";
import { sp } from '@pnp/sp';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'Apps365CandidateWebPartStrings';
import Apps365Candidate from './components/Apps365Candidate';
import { IApps365CandidateProps } from './components/IApps365CandidateProps';

export interface IApps365CandidateWebPartProps {
  description: string;
  baseUrl: string;
  serverRelativeUrl: string;
  useFullBleed: boolean;
}

export default class Apps365CandidateWebPart extends BaseClientSideWebPart<IApps365CandidateWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        defaultCachingTimeoutSeconds: 1200,  // 10 minutes, defaults is 30 seconds
        spfxContext: this.context,
        sp: {
          baseUrl: this.properties.baseUrl
        }
      });
    });
  }

  public render(): void {
    if (this.properties.baseUrl && this.properties.serverRelativeUrl && this.properties.baseUrl.length > 0 && this.properties.serverRelativeUrl.length > 0) {

      const element: React.ReactElement<IApps365CandidateProps> = React.createElement(
        Apps365Candidate,
        {
          description: this.properties.description,
          wpProps: this.properties
        }
      );

      ReactDom.render(element, this.domElement);
    } else {
      const element: React.ReactElement<IPlaceholderProps> = React.createElement(
        Placeholder,
        {
          iconName: "Edit",
          iconText: "Configure this Web Part",
          description: "You must add required properties before using this web part.",
          buttonLabel: "Configure",
          onConfigure: () => {
            this.context.propertyPane.open();
          }
        }
      );

      ReactDom.render(element, this.domElement);

    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('baseUrl', {
                  label: "Base Url for SPFX",

                  description: "I.e https://firstpoint.sharepoint.com/sites/myfabsite"
                }),
                PropertyPaneTextField("serverRelativeUrl", {
                  label: "Web - Server relative url",

                  description: "I.e /sites/myfabsite"
                })
              ]
            },
            {
              groupName: "Layout settings",
              groupFields: [
                PropertyPaneToggle("useFullBleed", {
                  label: "Use full width"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
