import styled from 'styled-components';

function Habits() {
  return (
    <HabitComponent>
      Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
    </HabitComponent>
  );
}

export default Habits;

const HabitComponent = styled.section`
  max-width: 500px;
  width: 100%;
  font-family: 'Lexend Deca', sans-serif; 
  font-size: 18px;
  line-height: 22px;
  color: #666666;
`;  