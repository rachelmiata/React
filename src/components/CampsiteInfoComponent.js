import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ModalBody,
    Modal,
    Label
  } from "reactstrap"
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() { 
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal} className="fa-lg" 
                ><i class="fa fa-lg fa-pencil" aria-hidden="true" ></i>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="form-group" >
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control"> 
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                            </div>
                            <div className="form-group" >
                                <Label htmlFor="author">Your Name</Label>
                                    <Control.text 
                                        model=".author" 
                                        id="author" 
                                        name="author" 
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors 
                                        className="test-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </div>
                            <div className="form-group" >
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea rows="6" model=".text" id="text" name="text" className="form-control" />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
  }

}

function RenderCampsite({campsite}) {
    return (
         <div className ="col-md-5 m-1">
             <Card>
             <CardImg top src={campsite.image} alt={campsite.name} />
             <CardBody>
                 <CardText>{campsite.description}</CardText>
             </CardBody>
             </Card>
         </div>
     )
}
function RenderComments({comments}) {
    if (comments) {
        return ( 
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => <div key={comment.id}>{comment.text} <p>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p></div>)}
<div><CommentForm /></div>
</div>

        );
    } else { 
        return( <div/> )
    }
}
function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                    <       Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link> </BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className ="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            )
        } else {
        return <div />
        }
    }
   


export default CampsiteInfo;