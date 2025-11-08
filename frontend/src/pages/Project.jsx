import React, { createRef, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import axios from '../config/axios'
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'

const Project = () => {

  const location = useLocation()

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(new Set());
  const [project, setProject] = useState(location.state.project)
  const [message, setMessage] = useState('')

  const { user } = useContext(UserContext)

  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const messageBox = React.createRef()

  const handleUserClick = (id) => {
    setSelectedUserId(prevSelectedUserId => {
      const newSelecterUserId = new Set(prevSelectedUserId);
      if (newSelecterUserId.has(id)) {
        newSelecterUserId.delete(id);
      } else {
        newSelecterUserId.add(id);
      }
      return newSelecterUserId;
    });
  }

  function addCollaborators() {
    axios.put('/projects/add-user', {
      projectId: location.state.project._id,
      users: Array.from(selectedUserId)
    }).then(res => {
      console.log(res.data)
      setIsModalOpen(false);

    }).catch(err => {
      console.log(err)
    })
  }

  const send = () => {
    console.log(user);
    sendMessage('project-message', {
      message,
      sender: user._id
    })

    setMessages(prevMessages => [...prevMessages, { sender: user, message }]) // Update messages state
    setMessage("")

  }

  useEffect(() => {

    initializeSocket(project._id);

    receiveMessage('project-message', (data) => {
      
    });

    axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
      console.log(res.data.project)
      setProject(res.data.project);
    })

    axios.get('/users/all').then(res => {
      setUsers(res.data.users);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  function scrollToBottom() {
   if (messageBox.current) { // Check if messageBox.current is not null
      messageBox.current.scrollTop = messageBox.current.scrollHeight
    }
  }

  // console.log(location.state)

  return (
    <main className='h-screen w-screen flex'>
      <section className='left relative flex flex-col h-full min-w-96 bg-slate-400'>
        <header className='flex justify-end w-full bg-slate-300'>
          <button className='flex gap-2 p-4'
            onClick={() => setIsModalOpen(true)}>
            <i className="ri-add-fill mr-1"></i>
            <p className='mr-[85px]'>Add Collaborator</p>
          </button>

          <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className='p-2'>
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className='conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative'>

          <div
            ref={messageBox}
            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide">
            {Array.isArray(messages) && messages.map((msg, index) => (
              <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-52'} ${msg.sender._id == user._id.toString() && 'ml-auto'}  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
                <small className='opacity-65 text-xs'>{msg.sender.email}</small>
                <div className='text-sm'>
                  {msg.sender._id === 'ai' ?
                    WriteAiMessage(msg.message)
                    : <p>{msg.message}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="input-field w-full flex absolute bottom-0">
            <input
              type="text"
              placeholder='Enter message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='p-2 px-4 border-none outline-none flex-grow' />
            <button
              onClick={send}
              className='flex-grow px-5 bg-slate-500'><i className="ri-send-plane-2-fill"></i>
            </button>
          </div>
        </div>

        <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
          <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>

            <h1
              className='font-semibold text-lg'
            >Collaborators</h1>

            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
              <i className="ri-close-fill"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-2">

            {project.users && project.users.map(user => {


              return (
                <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                  <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className='font-semibold text-lg'>{user.email}</h1>
                </div>
              )


            })}
          </div>
        </div>
      </section>

      {/* file section  */}
      <section className='right bg-50 flex-grow h-full flex'>
        <div className=''>
          <div>
            <button>
              <p className='font-semibold text-lg'>file</p>
            </button>
          </div>
        </div>
      </section>



      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className='p-2'>
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map(user => (
                <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                  <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className='font-semibold text-lg'>{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
              Add Collaborators
            </button>
          </div>
        </div>
      )}

    </main>
  )
}

export default Project