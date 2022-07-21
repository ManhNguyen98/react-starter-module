import clsx from 'clsx'
import Button from 'modules/shared/components/Button'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectDummies } from './selectors/dummy'
import { useDummySlice } from './slices/dummy'

const Home = () => {
  const dispatch = useDispatch()
  const { actions } = useDummySlice()
  const dummies = useSelector(selectDummies)
  const onToggleData = () => {
    if (dummies.length) {
      dispatch(actions.removeAllDummy({}))
    } else {
      dispatch(actions.getDummies({}))
    }
  }
  useEffect(() => {
    dispatch(actions.getDummies({}))
  }, [])
  return (
    <div
      className={clsx({
        'h-screen': dummies.length === 0,
      })}
    >
      <div className="flex justify-start ml-3 my-3">
        <Button variant="primary" onClick={onToggleData}>
          {dummies.length ? 'Clear all' : 'Load data'}
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {dummies.map((dummy) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg"
            key={dummy.id}
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{dummy.title}</div>
              <p className="text-gray-700 text-base">{dummy.body}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
