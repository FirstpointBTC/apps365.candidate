import * as React from 'react';
import styles from './Apps365Candidate.module.scss';
import { IApps365CandidateProps } from './IApps365CandidateProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { IShip } from '../../../models/IShip';
import GlobalFunctions from '../../../global/GlobalFunctions';
import { sp } from '@pnp/sp';
import { List } from 'office-ui-fabric-react';

export interface IApps365CandidateState {
  ships: IShip[];
}
export default class Apps365Candidate extends React.Component<IApps365CandidateProps, IApps365CandidateState> {
  public constructor(props: IApps365CandidateProps) {
    super(props);
    this.state = {
      ships: [],
    };
  }

  public componentDidMount(): void {
    GlobalFunctions.setFullBleed(this.props.wpProps.useFullBleed);

    let ships: IShip[] = [];
    sp.web.lists.getByTitle("Ships").items
      .select("Id, Title,CODE_FLAG,DATE_BUILT")
      .filter("DATE_BUILT ge 2000 and DATE_BUILT le 2002")
      .orderBy("Title").get()
      .then(_response => {
        this.setState({ ships: _response });
      });
  }

  public render(): React.ReactElement<IApps365CandidateProps> {
    return (
      <div className={styles.apps365Candidate}>
        <List
          items={this.state.ships}
          onRenderCell={this._onRenderCell}
        />
      </div>
    );
  }
  private _onRenderCell(item: IShip, index: number | undefined): JSX.Element {
    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <div className="ms-Grid-col ms-sm12">
            <span className={styles.title}>{item.Title}</span>
          </div>
        </div>
        <div className={styles.row + " " +styles.subTitle}>
          <div className={styles.column4}>
            <div>ID: {item.Id}</div>
          </div >
          <div className={[styles.column4,styles.description].join(" ")}>
            <div >Year: {item.DATE_BUILT}</div>
          </div >
          <div className={styles.column4}>
            <div >Flag: {item.CODE_FLAG}</div>
          </div >
        </div >
      </div >
    );
  }
}
