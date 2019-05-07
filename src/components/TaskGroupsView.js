import React, { Component } from 'react';
import { TaskItem } from '.';

class TaskGroupsView extends Component {

  renderItems = () => {
    const { groupData } = this.props;
    const tasks = groupData.tasks.map((task) => {
      return (
        <TaskItem
          key={task.id}
          task={task}
          completed={groupData.completed}
          checkOffHandler={this.props.checkOffHandler}
        />
      );
    })
    return tasks;
  }

  render() {
    return (
      <div id='task-list-container'>
        <div className='flex-container'>
          <h1>{this.props.groupData.groupName}</h1>
          <span
            className='link'
            onClick={this.props.allGroupsHandler}
          >
            ALL GROUPS
          </span>
        </div>
        <hr />
        <ul id="task-list">
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

export default TaskGroupsView;