import React, { useEffect, useState } from "react";
import "./Comment.css"
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import CommentForm from "./CommentForm"
import jAPI from "../../modules/apiManager";

const CommentCard = props => {
    const [modal, setModal] = useState(false);
    const [editedComment, setEditedComment] = useState({ comment: props.comment })

    console.log(props.activeUserId)

    const didUserComment = props.didUserComment
    const activeUserId = props.activeUserId
    const commentUserId = props.userId
    const numberOfStylesInCss = 3

    const toggle = () => {
        if (activeUserId == commentUserId) {
            setModal(!modal);
        }
    };

    const randomN = (int) => {
        if (props.userId === props.activeUserId) {
            return 4
        } else {
            return Math.ceil(Math.random() * int)
        }
    };

    const commentPatch = {
        comment: editedComment.comment
    }

    const handleSubmit = () => {
        jAPI.patch(commentPatch, "comments", props.commentId)
        setModal(!modal)
        props.findMovieIdGetComments();
    };

    const handleDelete = () => {
        
        jAPI.delete(props.commentId, "comments")
        setModal(!modal)
        props.findMovieIdGetComments();
    }


    return (
        <>
            <div className="commentContainer" onClick={toggle}>

                <div className={`usernameBox--${randomN(numberOfStylesInCss)}`}>{props.result.user.username} says...</div>
                <div className="commentBox">{props.result.comment}</div>
            </div>
            <Modal isOpen={modal} toggle={toggle} className="editModal">
                <ModalHeader toggle={toggle}>{props.result.user.username} says...</ModalHeader>
                <ModalBody className="marginBottom detailsMarginTop">
                    <CommentForm
                        comment={props.comment}
                        setEditedComment={setEditedComment}
                        editedComment={editedComment}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button className="saveButtonColor" onClick={handleSubmit}>save</Button>{' '}
                    <Button className="reviewButtonColor" onClick={handleDelete}>delete</Button>{' '}
                    {/* <Button color="secondary" onClick={toggle}>cancel</Button> */}
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CommentCard