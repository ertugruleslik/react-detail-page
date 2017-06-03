import React, {Component} from 'react';
import ReactDom from 'react-dom';

const css = require('../styles/app.scss');

class App extends Component {

	constructor(props) {
        super();

        this.state = {
            data: {
            	"Comments": []
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

	componentDidMount(){
		
        fetch('../data/data.json')
	      .then(response => response.json())
	      .then(json => {
	        
	        this.setState({
	          data: json,
	          defaultImg : json.Comments[0].User.AvatarImageUrl
	        });
       });
	}

	handleSubmit(e) {
        e.preventDefault();
        let name = this.name.value,
        	message = this.message.value;

        let comment = {
        	User: {
        		DisplayName: name,
        		AvatarImageUrl: this.state.defaultImg
        	},
        	Content : message,
        	Id: this.state.data.Comments.length + 1,
        	Date : this.getDate()
        }

        if(name && message){
        	this.setState({
	        	Content: this.state.data.Comments.push(comment) 
	    	})
        }

        this.name.value = "",
        this.message.value = "";
    }

    getDate(){
    	let d = new Date(),
			day = d.getDate(),
			month = d.getMonth() + 1,
			year = d.getFullYear(),
			hour = d.getHours(),
			minute = d.getMinutes(),
			second = d.getSeconds();

			return (day+'.'+month+'.'+year+' '+hour+':'+minute+':'+second);
    }

	render(){

		return(
			<div className="wrapper">
				<div className="header">
					<div className="header-banner">
						<img src={this.state.data.Image}/>
						<div className="header-title">{this.state.data.Title}</div>
					</div>
					<div className="header-description">{this.state.data.Content}</div>
				</div>
	
				<div className="comment-box-title">Yorumlar ({this.state.data.Comments.length})</div>
				<ul className="comment-list">
					{
	                    this.state.data.Comments.map((number) =>
	                        <li key={number.Id}>
	                        	<div className="user-photo"><img src={number.User.AvatarImageUrl}/></div>
	                        	<div className="comment-box">
	                        		<div className="user-name">{number.User.DisplayName}</div>
	                        		<div className="comment-date">{number.Date}</div>
	                        		<div className="comment-text">{number.Content}</div>
	                        	</div>
	                        </li>
	                    )
	                }
                </ul>

                <div className="comment-box-title">Yorum Gönder</div>
                <div className="comment-box-title">
                	<form onSubmit={this.handleSubmit}>
	                	<input className="form-input" placeholder="İsim" ref={(name) => this.name = name} name="title" type="text" />
					    <textarea className="form-input" placeholder="Mesajınız" ref={(message) => this.message = message} cols="30" rows="5"></textarea>
					    <button className="form-button">Gönder</button>
				    </form>
                </div>
			</div>
		)
	}
}

export default App;