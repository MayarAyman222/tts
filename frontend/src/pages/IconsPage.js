import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { normalizeMediaUrl, API_BASE_URL, fetchJson } from "../api/api";
import "./SubSubIconsPage.css";

const DEFAULT_IMAGE = normalizeMediaUrl("/public/default.jpg");

function IconsPage() {
  const { mainCategoryId, timePeriodId } = useParams();
  const [icons, setIcons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = timePeriodId
      ? `${API_BASE_URL}/timeperiods/${timePeriodId}/icons`
      : `${API_BASE_URL}/maincategories/${mainCategoryId}/icons`;

    fetchJson(url, { cache: "no-store" })
      .then((data) => setIcons(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.log(err);
        setIcons([]);
      });
  }, [mainCategoryId, timePeriodId]);

  return (
    <div className="subsub-page">
      <div className="subsub-hero">
        <button
          type="button"
          className="subsub-back"
          onClick={() => navigate(-1)}
        >
          رجوع
        </button>

        <h1 className="subsub-title">choose your category</h1>
      </div>

      {icons.length ? (
        <div className="subsub-grid">
          {icons.map((icon) => (
            <div key={icon.id} className="subsub-card">
              <button
                type="button"
                className="subsub-card-body"
                onClick={() => navigate(`/subicons/${icon.id}`)}
              >
                <img
                  src={normalizeMediaUrl(icon.imageUrl || icon.imgUrl) || DEFAULT_IMAGE}
                  alt={icon.title}
                  className="subsub-card-image"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = DEFAULT_IMAGE;
                  }}
                />

                <div className="subsub-card-footer">
                  <h3>{icon.title}</h3>
                  <p>{icon.expression}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">لا توجد عناصر.</p>
      )}
    </div>
  );
}

export default IconsPage;
