import React, { Component } from 'react'
import PermanentDrawerLeft from './PermanentDrawerLeft';
import { Link } from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import './headerUserPage.css';

export class HeaderUserPage extends Component {
    render() {
        return (
            <div>
                < PermanentDrawerLeft />
            </div>
        )
    }
}

export default HeaderUserPage
