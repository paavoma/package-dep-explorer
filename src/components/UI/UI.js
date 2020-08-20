import React from 'react';

import Aux from '../../hoc/Auxil';
import classes from './UI.module.css';

const ui = (props) => (
    <Aux>
        <div className={classes.Container}>
            <div className={classes.PackageListContainer}>
                <ul>

                    {
                        props.packList.map((pack, index) => {
                            return <li key={index}>{pack.name}</li>
                        }
                        )
                    }

                </ul>
            </div>
        </div>
        <div className={classes.Container}>
            <div className={classes.PackageInfoContainer}>
                <ul>

                    {
                        props.packList.map((pack, index) => {
                            return <li key={index}>{pack.description}</li>
                        }
                        )
                    }

                </ul>
            </div>
        </div>
    </Aux>
);

export default ui;