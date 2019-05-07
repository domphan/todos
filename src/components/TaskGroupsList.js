import React, { Component } from 'react';
import { TaskGroupsListItem, TaskGroupsView } from '.';

const URL = '/data.json'

class TaskGroupsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedData: undefined,
      loading: false,
      loadSucess: false,
      error: false,
      errorMsg: '',
      currentGroup: undefined,
      completed: {}
    }
  }

  async componentWillMount() {
    this.setState({ loading: true })
    const response = await fetch(URL)
      .catch(err => this.setState({ error: true, errorMsg: err.message }));
    if (response) {
      const data = await response.json();
      await this.groupData(data);
      this.setState({ loading: false, loadSucess: true })
    }
  }

  groupData = (data) => {
    const formattedData = {};
    data.forEach((task) => {
      if (!formattedData[task.group]) {
        formattedData[task.group] = {
          tasks: [],
          completed: {},
          numberCompleted: 0,
          total: 0,
        };
      }
      formattedData[task.group].tasks.push(task);
      formattedData[task.group].total += 1;
      if (task.completedAt) {
        formattedData[task.group].numberCompleted += 1;
        this.setState({
          completed: {
            ...this.state.completed,
            [task.id]: true
          }
        })
      } else {
        this.setState({
          completed: {
            ...this.state.completed,
            [task.id]: false
          }
        })
      }
    })
    this.setState({ formattedData })
  }

  renderListItems = () => {
    const listItems = [];
    const taskGroups = this.state.formattedData;
    let keyNumber = 0;
    for (let key in taskGroups) {
      listItems.push(
        <TaskGroupsListItem
          key={keyNumber}
          groupName={key}
          groupData={taskGroups[key].tasks}
          completed={this.state.completed}
          numberCompleted={taskGroups[key].numberCompleted}
          total={taskGroups[key].total}
          clickHandler={this.handleGroupClick}
        />
      )
      keyNumber++;
    }
    return listItems;
  }

  renderGroupView = () => {
    return (
      <TaskGroupsView
        allGroupsHandler={this.handleAllGroupsClick}
        groupData={{
          ...this.state.formattedData[this.state.currentGroup],
          groupName: this.state.currentGroup,
          completed: this.state.completed
        }}
        checkOffHandler={this.handleCheckOff}
      />
    )
  }

  handleGroupClick = (event, groupName) => {
    this.setState({ currentGroup: groupName });
  }

  handleAllGroupsClick = () => {
    this.setState({ currentGroup: undefined });
  }

  handleCheckOff = (event, taskId, success) => {
    if (success) {
      this.setState(prevState => ({
        completed: {
          ...prevState.completed,
          [taskId]: true
        }
      }));
    }
  }

  render() {
    return (
      <div>
        {!this.state.currentGroup ? <h1>Things To Do</h1> : ''}
        <ul className='task-groups'>
          {this.state.loadSucess && !this.state.currentGroup ? this.renderListItems() : ''}
          {this.state.currentGroup ? this.renderGroupView(this.state.currentGroup) : ''}
        </ul>
      </div>
    );
  }
}

export default TaskGroupsList;