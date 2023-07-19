// Import the TaskManager class and the chai library
const TaskManager = require('../assets/js/taskManager.js');
const chai = require('chai');
const expect = chai.expect;

// Create a test suite for the TaskManager class
describe('TaskManager', function() {
    // Use a beforeEach hook to create a common instance of the TaskManager class for each test case
    let taskManager;
    beforeEach(function() {
        taskManager = new TaskManager();
    });

    // Create a test case for the addTask method
    it('should add a new task object to the tasks array and increment currentId by 1', function() {
        // Call the addTask method with some sample data
        taskManager.addTask('Test task', 'This is a test task', 'Tester', '2023-07-31', 'To Do');
        // Expect the tasks array to have one element
        expect(taskManager.tasks).to.have.lengthOf(1);
        // Expect the first element of the tasks array to be an object with the given properties and values
        expect(taskManager.tasks[0]).to.deep.equal({
            id: 0,
            taskName: 'Test task',
            description: 'This is a test task',
            assignedTo: 'Tester',
            dueDate: '2023-07-31',
            status: 'To Do'
        });
        // Expect the currentId property to be 1
        expect(taskManager.currentId).to.equal(1);
    });

    // Create a test case for the deleteTask method
    it('should remove the task object with the given id from the tasks array', function() {
        // Add some sample tasks to the tasks array
        taskManager.addTask('Test task 1', 'This is a test task 1', 'Tester 1', '2023-07-31', 'To Do');
        taskManager.addTask('Test task 2', 'This is a test task 2', 'Tester 2', '2023-08-01', 'In Progress');
        taskManager.addTask('Test task 3', 'This is a test task 3', 'Tester 3', '2023-08-02', 'Done');
        // Call the deleteTask method with the id of the second task
        taskManager.deleteTask(1);
        // Expect the tasks array to have two elements
        expect(taskManager.tasks).to.have.lengthOf(2);
        // Expect the first element of the tasks array to be the first task object
        expect(taskManager.tasks[0]).to.deep.equal({
            id: 0,
            taskName: 'Test task 1',
            description: 'This is a test task 1',
            assignedTo: 'Tester 1',
            dueDate: '2023-07-31',
            status: 'To Do'
        });
        // Expect the second element of the tasks array to be the third task object
        expect(taskManager.tasks[1]).to.deep.equal({
            id: 2,
            taskName: 'Test task 3',
            description: 'This is a test task 3',
            assignedTo: 'Tester 3',
            dueDate: '2023-08-02',
            status: 'Done'
        });
    });

    // Create a test case for the getTaskById method
    it('should return the task object with the given id from the tasks array', function() {
        // Add some sample tasks to the tasks array
        taskManager.addTask('Test task 1', 'This is a test task 1', 'Tester 1', '2023-07-31', 'To Do');
        taskManager.addTask('Test task 2', 'This is a test task 2', 'Tester 2', '2023-08-01', 'In Progress');
        taskManager.addTask('Test task 3', 'This is a test task 3', 'Tester 3', '2023-08-02', 'Done');
        // Call the getTaskById method with the id of the second task
        const result = taskManager.getTaskById(1);
        // Expect the result to be an object with the given properties and values
        expect(result).to.deep.equal({
            id: 1,
            taskName: 'Test task 2',
            description: 'This is a test task 2',
            assignedTo: 'Tester 2',
            dueDate: '2023-08-01',
            status: 'In Progress'
        });
    });
});