import React, { useEffect, useRef, useState } from 'react'

export default function Miniproject() {
    const [todos, setTodos] = useState(() => {
        return JSON.parse(localStorage.getItem("todos")) || [];
    });
    const [job, setJob] = useState("");
    const inputRef = useRef();

    const getNewId = () => {
        let idMax = 0;
        todos.forEach(todo => {
            if (todo.id > idMax) {
                idMax = todo.id;
            }
        });
        return idMax + 1;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const index = localStorage.getItem("index") || -1;
        if (index !== -1) {
            todos[index].name = job;
        } else {
            if (job) {
                const newJob = {
                    id: getNewId(),
                    name: job,
                    status: false,
                }
                const newTodos = [...todos, newJob];
                setTodos(newTodos)
                localStorage.setItem("todos", JSON.stringify(newTodos));
                localStorage.removeItem("index");
                setJob("");
            }
            return;
        }
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodos(todos);
        localStorage.removeItem("index");
        setJob("");
    }

    const handleDelete = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        setTodos(newTodos);
    }

    const handleUpdate = (index) => {
        localStorage.setItem("index", index);
        setJob(todos[index].name);
        inputRef.current.focus();
    }

    const handleChangeStatus = (index) => {

        const newTodos = [...todos];
        newTodos[index].status = !newTodos[index].status;
        localStorage.setItem("todos", JSON.stringify(newTodos));
        setTodos(newTodos);
        setJob("");
    }
    return (
        <div>
            <section className="vh-70 gradient-custom">
                <div className="container py-5 h-100 bg-light">
                    <div
                        className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card bg-danger">
                                <div className="card-body p-5">
                                    <h1 style={{ marginBottom: 10, color: "white" }}>
                                        TODO LIST
                                    </h1>
                                    <h4 style={{ marginBottom: 40, color: "white" }}>Get thing done,one item at a time</h4>

                                    <div className="tab-content">
                                        <div className="tab-pane fade show active">
                                            <ul className="list-group mb-0">
                                                {
                                                    todos.map((value, index) => {
                                                        return (
                                                            <li
                                                                className="list-group-item d-flex
                                                                align-items-center border-0 mb-2
                                                                rounded justify-content-between"
                                                                style={{ backgroundColor: "#f4f6f7" }}
                                                                key={index}
                                                            >
                                                                <div className='pl-3'>
                                                                    <input
                                                                        className="form-check-input me-2"
                                                                        type="checkbox"
                                                                        checked={value.status}
                                                                        onChange={() => handleChangeStatus(index)}
                                                                    />
                                                                    {value.status ? (<del>{value.name}</del>) : (<span>{value.name}</span>)}
                                                                </div>
                                                                {value.status ? (<button className='btn btn-primary' disabled>Hoàn Thành</button>) : (<div>
                                                                    <a
                                                                        href="#!"
                                                                        className="text-info"
                                                                        title="Sửa công việc"
                                                                        onClick={() => handleUpdate(index)}
                                                                    >
                                                                        <i
                                                                            className="fas fa-pencil-alt me-3"
                                                                        />
                                                                    </a>
                                                                    <a
                                                                        href="#!"
                                                                        className="text-danger"
                                                                        title="Xóa công việc"
                                                                        onClick={() => handleDelete(index)}
                                                                    >
                                                                        <i
                                                                            className="fas fa-trash-alt"
                                                                        />
                                                                    </a>
                                                                </div>)}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>

                                        </div>
                                    </div>
                                    <p className='mt-4 fs-4' style={{ color: "white" }}>Add to the todo list</p>
                                    <form
                                        className="d-flex justify-content-center align-items-center mb-4"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="flex-fill">
                                            <input
                                                type="text" id="form2"
                                                className="form-control p-4"
                                                onChange={(e) => setJob(e.target.value)}
                                                placeholder='Type to Todo List'
                                                value={job}
                                                ref={inputRef}
                                            />

                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-outline-warning ms-2 p-3"
                                        >
                                            Save Item
                                        </button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
