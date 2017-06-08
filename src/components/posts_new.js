import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';


class PostsNew extends Component {

    renderField(field) {
        const {meta:{touched,error}} = field;// to shorten the name from field.meta.touched or error, TO just touched or error ES6 Features
        const className = `from-group ${touched && error ? 'has-danger' :''}`
        return (

            <div className={className}>
                <label>{field.label}</label>
                < input
                    className="form-control"
                    type="text"
                    {...field.input}//objects that contains many events handlers(onchange,on focus, onblur)
                /><div className="text-help">
                {touched ? error: ''}
                    </div>
            </div>
        )
    }

    onSubmit(values){
        
        this.props.createPost(values,()=>{
             this.props.history.push('/');
        });
       
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title For Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"                
                    name="categories"
                    component={this.renderField}
                />
                 <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )

    }
}

function validate(values){
const errors={};

if(!values.title){
    errors.title = "Enter a title!";
}if(!values.categories){
    errors.categories = "Enter Some categories";
}if(!values.content){
    errors.content = "Enter Some content";
}
return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm' // give a name for this form , sometimes we need to have more forms within our app
})(
connect(null,{createPost})(PostsNew)
);