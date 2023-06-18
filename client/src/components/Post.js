import { useState } from "react"
import { usePost } from "../contexts/PostContext"
import { useAsyncFn } from "../hooks/useAsync"
import { createComment } from "../services/comments"
import { ToggleUpvote } from "../services/users"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"
import Cookies from "js-cookie"

export function Post() {
  const userId = Cookies.get('userId')
  const [upvoteCount, setUpvoteCount] = useState()
  const { post, rootComments, createLocalComment } = usePost()
  const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)
  const ToggleUpvoteFn = useAsyncFn(ToggleUpvote)
  function ToggleUp() {
      console.log(post.id + " <-> " + userId)
      ToggleUpvoteFn.execute({postId: post.id, userId: userId}).then(ans=>{
        window.location.reload(false)
      })
  }

  function onCommentCreate(message) {
    return createCommentFn({ postId: post.id, message }).then(
      createLocalComment
    )
  }


  return (
    <>
      <button onClick={ToggleUp} >Upvotes: {post._count.Upvote}</button>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  )
}
