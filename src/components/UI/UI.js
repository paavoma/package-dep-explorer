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
            currentlySelectedElementIndex: []
        }
        this.liClicked = this.handleLiClick.bind(this);
        this.textAreaChanged = this.handleTextAreaChange.bind(this);

    }

    handleTextAreaChange = (event) => {
        
            this.setState({
                shownPackageNotes: event.target.value
            });
            this.props.packList[event.currentTarget.id].notes = event.target.value;
        console.log(this.state.shownPackageNotes);

    };

    handleLiClick = (event) => {
        const key = event.currentTarget.id;
        //reset previously selected package highlight
        let elmnt = document.getElementById(this.state.currentlySelectedElementIndex);
        if(elmnt !== null){
            elmnt.style.backgroundColor="";
        }
        

        this.setState({
            shownPackageName: this.props.packList[key].name,
            shownPackageDescription: this.props.packList[key].description,
            shownPackageDependencies: this.props.packList[key].dependencies,
            shownPackageDependancyLinkIndex: this.props.packList[key].dependencyLinkIndex,
            shownPackageRevDependencies: this.props.packList[key].revDependencies,
            shownPackageRevDependancyLinkIndex: this.props.packList[key].revDependencyLinkIndex,
            shownPackageNotes: this.props.packList[key].notes,
            currentlySelectedElementIndex: key
        });
    
        elmnt = document.getElementById(key);
        elmnt.scrollIntoView({behavior: "smooth", block: "center"});
        elmnt.focus();
        elmnt.style.backgroundColor="lightgray";
        //Save notes to local storage, so it can be viewed again.
        localStorage.setItem('data', JSON.stringify(this.props.packList));
    };

    getAlternateVersionsSuffix(packageNameToLink, packageNameWithAltVersions) {
        let packNameToLink = "";
        let packNameWithAltVersions = "";
        packNameToLink = packageNameToLink;
        packNameWithAltVersions = packageNameWithAltVersions;
        let finalPackageNameSuffix = "";

        if (packageNameToLink !== packageNameWithAltVersions) {
            let len = packageNameToLink.length;
            finalPackageNameSuffix = packageNameWithAltVersions.substring(len);
            return finalPackageNameSuffix;
        } else {
            return "";
        }
    }

    render() {
        
        return (
            <Aux>
                <div className={classes.UiContainer}>
                    <div className={classes.PackageListContainer}>
                        <div >
                            <ul>
                                {
                                    this.props.packList.map((pack, index) => {
                                        return <li key={index}
                                                    tabIndex='-1'>
                                            <a id={pack.id}
                                                onClick={this.liClicked}>{pack.name}</a>
                                        </li>
                                    }
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={classes.PackageInfoContainer}>
                        <div>
                            <h1>{this.state.shownPackageName}</h1>
                            <p>{this.state.shownPackageDescription}</p>
                            <p>Dependencies:</p>
                            <ul>
                                {
                                    this.state.shownPackageDependencies.map((dependency, index) => {
                                        if (this.state.shownPackageDependancyLinkIndex[index] !== null) {
                                            return <li key={index} >
                                                <a onClick={this.liClicked}
                                                    id={this.state.shownPackageDependancyLinkIndex[index]}>
                                                    {this.props.packList[this.state.shownPackageDependancyLinkIndex[index]].name}
                                                </a>
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
                            <p>Reverse dependencies:</p>
                            <ul>
                                {
                                    this.state.shownPackageRevDependencies.map((dependency, index) => {
                                        if (this.state.shownPackageRevDependancyLinkIndex[index] !== null) {
                                            return <li key={index} >
                                                <a onClick={this.liClicked}
                                                    id={this.state.shownPackageRevDependancyLinkIndex[index]}>
                                                    {this.props.packList[this.state.shownPackageRevDependancyLinkIndex[index]].name}
                                                </a>
                                                {this.getAlternateVersionsSuffix(this.props.packList[this.state.shownPackageRevDependancyLinkIndex[index]].name, dependency)}
                                            </li>
                                        } else {
                                            return <li key={index}>{dependency}</li>
                                        }
                                    }
                                    )
                                }
                            </ul>
                            <p>Notes: </p>
                            <textarea id={this.state.currentlySelectedElementIndex} 
                                    value={this.state.shownPackageNotes} 
                                    onChange={this.textAreaChanged}
                                    rows="4" 
                                    cols="50"></textarea>
                        </div>
                    </div>
                </div>
            </Aux>
        );

    };
};

export default Ui;