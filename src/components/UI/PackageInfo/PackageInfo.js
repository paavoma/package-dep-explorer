import React from 'react';

const packageinfo = (props) => {

    return (
        <div>
            <h1>{props.shownPackageName}</h1>
            <p>{props.shownPackageDescription}</p>
            <p>Dependencies:</p>
            <ul>
                {
                    props.shownPackageDependencies.map((dependency, index) => {
                    return <li key={index}>{dependency}</li>
                    }
                    )
                }
            </ul>
            <p>Reverse dependencies:</p>
            <ul>
                {
                    props.shownPackageRevDependencies.map((dependency, index) => {
                    return <li key={index}>{dependency}</li>
                    }
                    )
                }
            </ul>
        </div>
    );

};

export default packageinfo;