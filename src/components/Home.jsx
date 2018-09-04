import React, { Component } from 'react';
import { connect } from 'react-redux';
import getTodos from '../actions/getTodosAction';
import NewTodo from './NewTodo';
import { Link } from 'react-router-dom';

class Home extends Component {
  componentWillReceiveProps(props) {
    if (!props.email) {
      props.history.push('/login');
    }
  }
  componentDidMount() {
    this.props.getTodos(this.props.auth);
  }
  render() {
    return (
      <div className="container row mt-4">
        <div className="col-md-6 m-auto">
          <h2>Welcome to Simple Todo App</h2>
          <span>
            <strong className="text-success ">
              You are logged in as {this.props.email}
            </strong>
          </span>
          <br />
          <br />
          <br />
          <div className="card">
            <div className="card-body">
              <NewTodo />
            </div>
          </div>

          <div className="mt-5">
            <h3>
              You currently have :{' '}
              {this.props.todos ? this.props.todos.length : 0} Todos'
            </h3>

            {this.props.todos
              ? this.props.todos.map(todo => {
                  return (
                    <div key={todo._id}>
                      <span>{todo.text}</span>
                    </div>
                  );
                })
              : null}

            <Link to="/todos" className="btn btn-block btn-secondary mt-3">
              Get Detailed List of all Todos
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.currentUser.user['x-auth'],
    email: state.currentUser.user.email,
    todos: state.todos.todos
  };
}

export default connect(
  mapStateToProps,
  {
    getTodos
  }
)(Home);