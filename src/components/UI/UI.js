import React, { Component } from 'react';
import Aux from '../../hoc/Auxil';
import classes from './UI.module.css';

class Ui extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shownPackageName: "",
            shownPackageDescription: "",
            shownPackageDependencies: [],
            shownPackageDependancyLinkIndex: [],
            shownPackageRevDependencies: [],
            shownPackageRevDependancyLinkIndex: [],
            shownPackageNotes: "",
            currentlySelectedElementIndex: [],
            isPackageLoaded: false,
            prevSavedPackageList: []
        }
        this.liClicked = this.handleLiClick.bind(this);
        this.textAreaChanged = this.handleTextAreaChange.bind(this);
        

    };

    componentDidMount(){
        //saves packagelist to local storage every 5 seconds
        const interval = setInterval(() => {
            this.saveToLocalStorage();
        }, 5000);
    }

    saveToLocalStorage(){
        
        const packList = this.props.packList;
        localStorage.setItem('data', JSON.stringify(packList));
         
    };
    //saves notes changes to packagelist
    handleTextAreaChange = (event) => {

        this.setState({
            shownPackageNotes: event.target.value
        });
        this.props.packList[event.currentTarget.id].notes = event.target.value;
    };

    handleLiClick = (event) => {
        const key = event.currentTarget.id;

        //reset previously selected package highlight
        let elmnt = document.getElementById(this.state.currentlySelectedElementIndex);
        if (elmnt !== null) {
            elmnt.style.backgroundColor = "";
        }

        this.updateShownPackageState(key);

        //highlight clicked li and scroll to it
        elmnt = document.getElementById(key);
        elmnt.scrollIntoView({ behavior: "smooth", block: "center" });
        elmnt.focus();
        elmnt.style.backgroundColor = "lightgray";
        
    };

    updateShownPackageState(key) {
        this.setState({
            shownPackageName: this.props.packList[key].name,
            shownPackageDescription: this.props.packList[key].description,
            shownPackageDependencies: this.props.packList[key].dependencies,
            shownPackageDependancyLinkIndex: this.props.packList[key].dependencyLinkIndex,
            shownPackageRevDependencies: this.props.packList[key].revDependencies,
            shownPackageRevDependancyLinkIndex: this.props.packList[key].revDependencyLinkIndex,
            shownPackageNotes: this.props.packList[key].notes,
            currentlySelectedElementIndex: key,
            isPackageLoaded: true
        });
    };

    getAlternateVersionsSuffix(packageNameToLink, packageNameWithAltVersions) {
        
        let packNameToLink = packageNameToLink;
        let packNameWithAltVersions = packageNameWithAltVersions;
        let finalPackageNameSuffix = "";

        if (packNameToLink !== packNameWithAltVersions) {
            let len = packNameToLink.length;
            finalPackageNameSuffix = packNameWithAltVersions.substring(len);
            return finalPackageNameSuffix;
        } else {
            return "";
        }
    };

    renderShownPackage() {
        if (this.state.isPackageLoaded === true) {
            return (
                
                    <div className={classes.PackageInfoContent}>
                        <h1>{this.state.shownPackageName}</h1>
                        <p>{this.state.shownPackageDescription}</p>
                        <hr></hr>
                        <h3>Dependencies:</h3>
                        <ul>
                            {
                                this.state.shownPackageDependencies.map((dependency, index) => {
                                    if (this.state.shownPackageDependancyLinkIndex[index] !== null) {
                                        return <li key={index} >
                                            <button  onClick={this.liClicked}
                                                type="button"
                                                className={classes.LinkButton}
                                                id={this.state.shownPackageDependancyLinkIndex[index]}>
                                                {this.props.packList[this.state.shownPackageDependancyLinkIndex[index]].name}
                                            </button>
                                            {this.getAlternateVersionsSuffix(this.props.packList[this.state.shownPackageDependancyLinkIndex[index]].name, dependency)}
                                        </li>
                                    }

                                    else {
                                        return <li key={index}>{dependency}</li>
                                    };

                                }
                                )
                            }
                        </ul>
                        <h3>Reverse dependencies:</h3>
                        <ul>
                            {
                                this.state.shownPackageRevDependencies.map((dependency, index) => {
                                    if (this.state.shownPackageRevDependancyLinkIndex[index] !== null) {
                                        return <li key={index} >
                                            <button onClick={this.liClicked}
                                                type="button"
                                                className={classes.LinkButton}
                                                id={this.state.shownPackageRevDependancyLinkIndex[index]}>
                                                {this.props.packList[this.state.shownPackageRevDependancyLinkIndex[index]].name}
                                            </button>
                                            {this.getAlternateVersionsSuffix(this.props.packList[this.state.shownPackageRevDependancyLinkIndex[index]].name, dependency)}
                                        </li>
                                    } else {
                                        return <li key={index}>{dependency}</li>
                                    }
                                }
                                )
                            }
                        </ul>
                        <hr></hr>
                        <p>Notes: </p>
                        <textarea id={this.state.currentlySelectedElementIndex}
                            value={this.state.shownPackageNotes}
                            onChange={this.textAreaChanged}
                            rows="4"></textarea>
                    </div>
                    
            );

        } else {
            return (
                <div className={classes.DefaultPackageContent}>
                    <h1>Please select a package</h1>
                </div>
            );
        }

    };

    render() {

        return (
            <Aux>
                <div className={classes.UiContainer}>
                    <div className={classes.PackageListContainer}>
                        <div className={classes.PackageListContent}>
                            <ul>
                                {
                                    this.props.packList.map((pack, index) => {
                                        return <li key={index}
                                            tabIndex='-1'>
                                            <button id={pack.id} 
                                                onClick={this.liClicked}
                                                type="button"
                                                className={classes.LinkButton}>{pack.name}</button>
                                        </li>
                                    }
                                    )
                                }
                            </ul>
                        </div>

                    </div>
                    <div className={classes.PackageInfoContainer}>           
                        {this.renderShownPackage()}
                    </div>
                </div>
            </Aux>
        );

    };
};

export default Ui;