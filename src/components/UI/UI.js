import React,{Component} from 'react';

import Aux from '../../hoc/Auxil';
import classes from './UI.module.css';
import PackageInfo from './PackageInfo/PackageInfo';

class Ui extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            shownPackageName: "",
            shownPackageDescription: "",
            shownPackageDependencies: [],
            shownPackageRevDependencies: []
        }
        this.liClicked = this.handleLiClick.bind(this);
    }

    handleLiClick = (event) => {
        const key = event.currentTarget.id;
        console.log(key);

        this.setState({
            shownPackageName: this.props.packList[key].name, 
            shownPackageDescription: this.props.packList[key].description,
            shownPackageDependencies: this.props.packList[key].dependencies,
            shownPackageRevDependencies: this.props.packList[key].revDependencies
        });
    };

    


    render() {
        return(
            <Aux>
            <div className={classes.Container}>
                <div className={classes.PackageListContainer}>
                    <ul>

                        {
                            this.props.packList.map((pack, index) => {
                                return <li id={pack.id} key={index} onClick={this.liClicked}>{pack.name}</li>
                            }
                            )
                        }

                    </ul>
                </div>
            </div>
            <div className={classes.Container}>
                <div className={classes.PackageInfoContainer}>


                    <PackageInfo
                        shownPackageName={this.state.shownPackageName}
                        shownPackageDescription={this.state.shownPackageDescription}
                        shownPackageDependencies={this.state.shownPackageDependencies}
                        shownPackageRevDependencies={this.state.shownPackageRevDependencies}></PackageInfo>


                </div>
            </div>
        </Aux>
        );
        
    };
};

export default Ui;