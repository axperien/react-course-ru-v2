import React from 'react';
import PropTypes from 'prop-types';

class Add extends React.Component {
    state = {
        name: '',
        text: '',
        bigText: '',
        agree: false
    }
  
    onClickHandler = (e) => {
        e.preventDefault();
        const { name, text, bigText } = this.state;
        this.props.onAddNews({ 
            id: +new Date(),
            author: name,
            text,
            bigText
        });
    }
  
    handleChange = (e) => {
        const { id } = e.currentTarget;
        this.setState({[id]: e.currentTarget.value})
    }
  
    handleCheckboxChange = (e) => {
        this.setState({ agree: e.currentTarget.checked})
    }
  
    validate = () => {
        const { name, text, agree } = this.state;
  
        return (name.trim() && text.trim() && agree) ? true : false;
    }
  
    render() {
        const { name, text, bigText} = this.state;
        
        return (
            <form className='add'>
                <input 
                    type='text'
                    id='name'
                    className='add__author' 
                    placeholder='Ваше имя'
                    onChange={this.handleChange}
                    value={name}
                />
                <textarea
                    className='add__text'
                    id='text'
                    placeholder='Текст новости'
                    onChange={this.handleChange}
                    value={text}
                ></textarea>
                <textarea
                    className='add__text'
                    id='bigText'
                    placeholder='Текст новости подробно'
                    onChange={this.handleChange}
                    value={bigText}
                ></textarea>
                <label className='add__checkrule'>
                    <input type='checkbox' onChange={this.handleCheckboxChange} />
                    Я согласен
                </label>
                <button 
                    className='add__btn'
                    onClick={this.onClickHandler}
                    disabled={!this.validate()}>
                    Добавить новость
                </button>
            </form>
        )
    }
  }
  
  Add.propTypes = {
    onAddNews: PropTypes.func.isRequired
  }

  export { Add }