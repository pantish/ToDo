import React from "react";
import classNames from 'classnames'

import './Badge.scss';


const Budge = ({color, onClick, className}) => (
<i onClick={onClick} className= {classNames('badge', {[`badge--${color}`] : color}, className)}
></i>
);

export default Budge;