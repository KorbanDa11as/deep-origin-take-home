package datalayer

import (
	"database/sql"
	"fmt"

	_ "modernc.org/sqlite"
)

const DB_FILENAME = "./dataLayer/test.db"

type Task struct {
	Id int64 `json:"id" form:"id" `
	NewTask
}
type NewTask struct {
	Name     string `json:"name" form:"name" validate:"required,min=3"`
	Progress int    `json:"progress" form:"progress" validate:"gte=0, lte=100"`
	Tags     string `json:"tags" form:"tags" `
}
type User struct {
	Id    int64  `json:"id" form:"id" `
	First string `json:"first" form:"first" `
	Last  string `json:"last" form:"last" `
	// Avatar int64
}
type TaskUserRow struct {
	Task
	Assignee User
}
type TaskWithUser struct {
	Task
	Assignees []User `json:"assignees"`
}

func openDB() *sql.DB {
	db, err := sql.Open("sqlite", DB_FILENAME)
	if err != nil {
		fmt.Print("err in connection", err)
	}
	return db
}

func boolToInt(bool bool) int {
	if bool {
		return 1
	}
	return 0
}

// Insert funcs

func InsertTask(newTask *NewTask) int64 {
	db := openDB()
	defer db.Close()

	// err1 := db.QueryRow("INSERT INTO Interval (duration, name, color) VALUES(?,?,?) RETURNING interval_id", newInterval.Duration, newInterval.Metadata.Name, newInterval.Metadata.Color).Scan(&intervalID)
	res, err1 := db.Exec("INSERT INTO task ( name, progress, tags) VALUES(?,?);", newTask.Name, newTask.Progress, newTask.Tags)
	if err1 != nil {
		fmt.Print("err1 in insert task  ", err1)
	}
	insertId, err2 := res.LastInsertId()

	if err2 != nil {
		fmt.Print("err2 in insert task  ", err1)
	}
	// fmt.Println("the inserted key is: ", insertId)
	return insertId
}

// Update funcs

func updateTask(updatedTask Task) int64 {
	db := openDB()
	defer db.Close()

	fmt.Print("this is the task  to update", updatedTask)
	// err1 := db.QueryRow("INSERT INTO Interval (duration, name, color) VALUES(?,?,?) RETURNING interval_id", newInterval.Duration, newInterval.Metadata.Name, newInterval.Metadata.Color).Scan(&intervalID)
	_, err1 := db.Exec("UPDATE task  SET name = ?, progress = ?, tags = ?;", updatedTask.Name, updatedTask.Progress, updatedTask.Tags)
	if err1 != nil {
		fmt.Print("err1 in update Task  ", err1)
	}
	// fmt.Println("the updated key is: ", updatedTask.Id)
	return updatedTask.Id
}

func UpdateTaskAssigneeAssoc(task int64, users []int64) int64 {
	db := openDB()
	defer db.Close()

	_, err := db.Exec("DELETE From task_assignees WHERE task=?", task)
	if err != nil {
		fmt.Print("err1 in deleting old assoc", err)
	}

	for _, id := range users {
		fmt.Println("inserting: ", id, "into task: ", task)
		_, err2 := db.Exec("INSERT INTO task_assignees(user, task  ) VALUES(?,?) ", id, task)
		if err != nil {
			fmt.Print("err2 in inserting new task_assignees", err2)
		}
	}
	return task
}

// Delete funcs
func DeleteUserAssoc(task int64, user int64) bool {
	db := openDB()
	fmt.Println("removing user: ", user, "from task: ", task)
	defer db.Close()
	// err1 := db.QueryRow("INSERT INTO Interval (duration, name, color) VALUES(?,?,?) RETURNING interval_id", newInterval.Duration, newInterval.Metadata.Name, newInterval.Metadata.Color).Scan(&intervalID)
	_, err1 := db.Exec("DELETE FROM task_assignees WHERE task = ? AND user=?", task, user)
	if err1 != nil {
		fmt.Print("err1 in DeleteUserAssoc  ", err1)
		return false
	}
	return true
}

func DeleteAssoc(entity string, ID int64) bool {
	db := openDB()
	defer db.Close()
	fmt.Println("test: ", entity, ID)
	// err1 := db.QueryRow("INSERT INTO Interval (duration, name, color) VALUES(?,?,?) RETURNING interval_id", newInterval.Duration, newInterval.Metadata.Name, newInterval.Metadata.Color).Scan(&intervalID)
	_, err1 := db.Exec(fmt.Sprintf("DELETE FROM task_assignees WHERE %s = ?", entity), ID)
	if err1 != nil {
		fmt.Print("err1 in deleteAssoc  ", err1)
		return false
	}
	return true
}

func DeleteTask(TimerConfigID int64) bool {
	status := DeleteAssoc("task", TimerConfigID)
	if !status {
		fmt.Println("err in deleteAssoc with task")
	}

	db := openDB()
	defer db.Close()

	// err1 := db.QueryRow("INSERT INTO Interval (duration, name, color) VALUES(?,?,?) RETURNING interval_id", newInterval.Duration, newInterval.Metadata.Name, newInterval.Metadata.Color).Scan(&intervalID)
	_, err1 := db.Exec("DELETE FROM task WHERE id=?;", TimerConfigID)
	if err1 != nil {
		fmt.Print("err1 in DeleteTask   ", err1)
		return false
	}
	return true
}

// Get funcs

func GetTask(id int64) Task {
	db := openDB()
	defer db.Close()
	var timer Task

	err := db.QueryRow("SELECT id, name, progress FROM task WHERE id = ?", id).Scan(&timer.Id, &timer.Progress, &timer.Name, &timer.Tags)
	if err != nil {
		fmt.Print("err in query Timer by id:", err)
	}
	return timer
}

func QueryTasksWithUser(page int, pageSize int) *sql.Rows {
	db := openDB()
	defer db.Close()

	rows, err := db.Query("SELECT t.*,u.* FROM task t LEFT JOIN task_assignees a ON t.id=a.task LEFT JOIN user u ON a.user=u.id ")
	if err != nil {
		fmt.Print("err in query tasks with user ", err)
	}
	return rows
}

func GetUsers() []User {
	db := openDB()
	defer db.Close()
	rows, err := db.Query("SELECT id, first_name, last_name FROM user ")
	if err != nil {
		fmt.Print("err in query user ", err)
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var userRow User
		fmt.Println("user", userRow)
		rows.Scan(&userRow.Id, &userRow.First, &userRow.Last)
		users = append(users, userRow)
	}
	if err != nil {
		fmt.Print("err in query tasks with user ", err)
	}
	return users
}

func GetTasks() []TaskWithUser {
	rows := QueryTasksWithUser(0, 10)
	defer rows.Close()
	var taskWithAssignee []TaskWithUser
	var lastIterRowId int64
	for rows.Next() {
		var taskUserRow TaskUserRow
		// rows.Scan(&taskUserRow.Id, &taskUserRow.Progress, &taskUserRow.Name, &taskUserRow.Tags)
		rows.Scan(&taskUserRow.Id, &taskUserRow.Progress, &taskUserRow.Name, &taskUserRow.Tags, &taskUserRow.Assignee.Id, &taskUserRow.Assignee.First, &taskUserRow.Assignee.Last)

		if taskUserRow.Id == lastIterRowId {
			taskWithAssignee[len(taskWithAssignee)-1].Assignees = append(taskWithAssignee[len(taskWithAssignee)-1].Assignees, taskUserRow.Assignee)
		} else {
			lastIterRowId = taskUserRow.Id
			newCompositon := []User{taskUserRow.Assignee}
			var newTaskEntry TaskWithUser
			if taskUserRow.Assignee.Id == 0 {
				fmt.Println("WTF", newTaskEntry)
				newTaskEntry = TaskWithUser{Task: Task{Id: taskUserRow.Id, NewTask: NewTask{Progress: taskUserRow.Progress, Name: taskUserRow.Name, Tags: taskUserRow.Tags}}, Assignees: nil}
			} else {
				newTaskEntry = TaskWithUser{Task: Task{Id: taskUserRow.Id, NewTask: NewTask{Progress: taskUserRow.Progress, Name: taskUserRow.Name, Tags: taskUserRow.Tags}}, Assignees: newCompositon}
			}
			taskWithAssignee = append(taskWithAssignee, newTaskEntry)
		}
	}

	return taskWithAssignee
}
