import { Button, Input, HStack, VStack, Box, Text, useDisclosure,Modal,ModalContent,ModalFooter,ModalBody,ModalCloseButton,ModalHeader,ModalOverlay,Alert,AlertIcon } from '@chakra-ui/react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import React, {useState} from 'react'

const App = () => {
  const [tasks,setTasks] = useState([]);  
  const [val,setVal] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  function clickEnter(e){
    if (e.key === 'Enter') {
      addTask();
    }
  }

  function addTask(){
    setTasks([...tasks,val])
    setVal('')
  }

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  }

  const deleteTasks = () => {
    setTasks([]);
    
  }

  return (
    <Box className='App' display='flex' justifyContent='center' pt={8}>
      <VStack w='90%' display='flex' justifyContent='flex-start'>
        <HStack spacing={1} w='100%' h='fit-content' justifyContent={'space-between'}>
          <Text w='fit-content' fontSize='1.2rem' color='#fff' fontWeight='bold' ml={2}>Tasks</Text>
          {
            (tasks.length != 0)? <Text w='fit-content' onClick={onOpen} cursor={'pointer'} fontSize='1.2rem' color='red' fontWeight='bold' mr={2}>Delete All</Text>: ''
          }          
        </HStack>
        {
          (tasks.length == 0)? <Text w='99%' fontSize='1.2rem' color='red' fontWeight='bold' ml={2}>There are no Tasks</Text>: ''
        }
        <VStack w='100%' h={'70%'} overflowX='hidden' mb='2rem'>
          {
            tasks.map((task)=>{
              return(
                <HStack spacing={1} w='100%' fontSize='1.2rem' color='#fff' px={1} py={1} borderRadius={8} backgroundColor='#344955'>
                  <Text w='100%' ml={1}>{task}</Text>
                  <Button colorScheme='red' px={0} onClick={() => deleteTask(task)}><MdOutlineDeleteOutline fontSize='1.6rem' /></Button>
                </HStack>
              )
            })
          }        
        </VStack>
        <HStack spacing={2} w='90%' h='fit-content' pos={'absolute'} bottom={12}>
          <Input className='inp' onKeyDown={(e) => clickEnter(e)} placeholder='Enter a Task' value={val} onChange={(e)=>setVal(e.target.value)}/>
          <Button colorScheme='green' onClick={addTask}>ADD</Button>
        </HStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor='#16252d'>
            <ModalHeader>Final confirmaion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure to delete all tasks</Text>
           </ModalBody>
           <ModalFooter>
             <Button colorScheme='red' mr={3} onClick={onClose}>Cancel</Button>
             <Button colorScheme='blue' variant='ghost' onClick={()=>{onClose();deleteTasks()}}>Delete Tasks</Button>
           </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  )
}

export default App
