import React, { useEffect, useState } from "react";
import "./Comment.css"
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {Link} from "react-router-dom"
import CommentForm from "./CommentForm"
import jAPI from "../../modules/apiManager";

const CommentCard = props => {
    console.log(props.userId, "props.userId")
    console.log(props.activeUserId, "props.activeUserId")

    const [modal, setModal] = useState(false);
    const [editedComment, setEditedComment] = useState({ comment: props.comment })

    console.log(props.result, "RESULT")

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

    const linkFunction = () => {
        if (activeUserId === commentUserId) {
            return `/profile`
        } else {
            return `/${commentUserId}`
        }
    }

    return (
        <>
            <div className="commentContainer" onClick={toggle}>
                <Link to={linkFunction} className="linkText">
                    <div className={`usernameBox--${randomN(numberOfStylesInCss)}`}>{props.result.user.username} says...</div>
                </Link>
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