import {ReactNode} from 'react'
import '../estilos/question.scss'

type QuestionProps = {
  content: string;  //conteúdo da pergunta
  author: {         //a pessoa logada
    name: string;   
    avatar: string;
  };
  children? : ReactNode; //todo componenete pode ter um nó children
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