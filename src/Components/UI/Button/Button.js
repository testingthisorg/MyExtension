import React from 'react';
import Button from '@material-ui/core/Button/Button';
import classes from './Button.module.scss';

const button = (props) => (
    <Button
        variant={props.variant}
        type={props.btnType ? props.btnType : 'button'}
        color={props.color}
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</Button>
);

export default button;