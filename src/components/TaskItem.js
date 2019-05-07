import React, { Component } from 'react';

class TaskItem extends Component {

  renderListElement = () => {
    const { task, completed } = this.props;
    this.status = 'undetermined';
    task.dependencyIds.forEach((dependency) => {
      if (!completed[dependency]) {
        this.status = 'locked';
      }
    });
    if (this.status !== 'locked') {
      if (completed[task.id]) {
        this.status = 'completed'
      } else {
        this.status = 'incomplete'
      }
    }

    return (
      <li className='tasks'>
        <div className='task-container'>
          <span id={`${this.status}-icon`}></span>
          <span className={this.status}>{this.props.task.task}</span>
        </div>

      </li>
    );
  }


  render() {
    return (
      <div
        onClick={e => {
          if (this.status === 'locked') {
            this.props.checkOffHandler(e, this.props.task.id, false);
          } else {
            this.props.checkOffHandler(e, this.props.task.id, true);
          }
        }}
      >
        {this.renderListElement()}
        <hr />
      </div>
    );
  }
}

export default TaskItem;