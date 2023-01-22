import {Fragment} from 'react';
import { Title } from '@mantine/core';

const Logo = () => {
    return(
        <Fragment>
                <img src ={process.env.PUBLIC_URL + "/images/logo.svg"}/>
        </Fragment>
    )
}

export default Logo;