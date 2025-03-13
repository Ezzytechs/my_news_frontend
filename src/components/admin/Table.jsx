import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faTrash,
 faTrashAlt
} from "@fortawesome/free-solid-svg-icons";



const NewsTable = ({ newsStats, onDeleteNews }) => {
  if(!newsStats) return <div>No Data</div>
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="border p-2">Title</th>
          <th className="border p-2">Views</th>
          <th className="border p-2">Tags</th>
          <th className="border p-2">Likes</th>
          <th className="border p-2">Dislikes</th>
          <th className="border p-2"></th>
        </tr>
      </thead>
      <tbody>
        {newsStats.map((news, index) => (
          <tr key={news._id + index}>
            <td className="border p-2 text-blue-500"><Link to={`/news/${news._id}`}>{news.title.substring(0, 20)}...</Link></td>
            <td className="border p-2">{news.views}</td>
            <td className="border p-2 capitalize text-blue-500">{news.tags.map((tag)=>(<Link key={tag} to={`/news/tags/${tag}`}> {tag}</Link>))}</td>
            <td className="border p-2">{news.likes}</td>
            <td className="border p-2">{news.dislikes}</td>
            <td className="border p-2">
              <button
                onClick={() => onDeleteNews(news._id)}
                className=" text-red-500 hover:text-red-800 px-3 py-1 rounded"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NewsTable;
