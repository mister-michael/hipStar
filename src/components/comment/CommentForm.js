import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap"

const CommentForm = props => {

    const handleChange = (evt) => {
        const stateToChange = { ...props.editedComment }
        stateToChange[evt.target.id] = evt.target.value;
        props.setEditedComment(stateToChange);
    }

    useEffect(() => {

    }, [])

    return (
        <FormGroup>
            <Input
                id="comment"
                type="textarea"
                name="text" 
                onChange={handleChange}
                value={props.editedComment.comment} />
        </FormGroup>
    )
}

export default CommentForm;