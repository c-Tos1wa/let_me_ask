import '../estilos/question.scss'
import {ReactNode} from 'react'

type QuestionProps = {
  content: string;  //conteúdo da pergunta
  author: {         //a pessoa logada
    name: string;   
    avatar: string;
  };
  children? : ReactNode;
}

export function Question({
  content,
  author,
  children
}: QuestionProps){
  return(
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name}/>
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  )
}