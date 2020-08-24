import React from 'react';

const packageinfo = (props) => {

    const showIndex = (props, index) => {
        if(props.shownPackageDependancyLinkIndex[index] !== null){
            return props.shownPackageDependancyLinkIndex[index];
        }
    }

    return (
        <p></p>
    );

};

export default packageinfo;