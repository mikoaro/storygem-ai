import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
  return (
    <div>
          <div className="p-5 py-24 flex flex-col items-center mt-10 border-2 border-dashed">
            <h2>
              You currently don&apos;t have any Videos. Please add some so that
              you can see them right here!
            </h2>
            <Button asChild>
              <Link href={"/test/dashboard/new"}>
                <PlusCircle className="mr-2 size-4" />
                Create Video
              </Link>
            </Button>
          </div>
        </div>
  )
}

export default EmptyState
