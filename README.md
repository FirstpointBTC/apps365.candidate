# Apps365 Candidate

## Test webpart:

```bash
git clone the repo
npm i
gulp serve
```
Open 
https://firstpoint.sharepoint.com/sites/Apps365Intervju/_layouts/15/workbench.aspx

Add webpart
_apps365candidate_

You should now see a list of Ships.

## Setup machine

To develop this webpart we used the instructions here:
1. Setup machine for SPFx https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
2. Build your first webpart https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part

If you are getting errors with certificates and spfx-serve you might need to do 1. and 2. above and then within your generated webpart directory:
```bash
gulp trust-dev-cert
```
as seen here: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part#preview-the-web-part



## More info about task

See 
- Oppgave på norsk https://firstpoint.sharepoint.com/sites/Apps365Intervju/
- Task in english https://firstpoint.sharepoint.com/sites/Apps365Intervju/SitePages/Task-for-candidates.aspx



