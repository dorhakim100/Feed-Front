import { useSelector } from 'react-redux'

export function AppFooter() {
  const count = useSelector((storeState) => storeState.userModule.count)

  return (
    <footer className='app-footer full'>
      <p>
        Copyright &copy; 2024 <span>Dor Hakim</span>
      </p>
    </footer>
  )
}
