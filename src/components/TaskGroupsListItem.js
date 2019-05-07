import React, { Component } from 'react';

class TaskGroupsListItem extends Component {
  render() {
    this.getAmountCompleted();
    return (
      <div onClick={e => this.props.clickHandler(e, this.props.groupName)}>
        <li className='groups'>
          <strong>{this.props.groupName}</strong>
          <p>{`${this.getAmountCompleted()} OF ${this.props.total} TASKS COMPLETE`}</p>
        </li>
        <hr />
      </div>
    );
  }

  // Returns the amount of tasks completed for the task group
  getAmountCompleted = () => {
    const { groupData, completed } = this.props;
    let amountCompleted = 0;
    groupData.forEach((task) => {
      if (completed[task.id]) {
        amountCompleted++;
      }
    });
    return amountCompleted;
  }
}

export default TaskGroupsListItem;