import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import Annotation from "global/components/Annotation";
import EntityCollection from "../EntityCollection";
import EmptyMessage from "reader/components/notes/EmptyMessage";

function ReaderFullNotesEntityCollection({
  groupedAnnotations,
  readingGroup,
  handleVisitAnnotation,
  annotationsMeta,
  filterProps,
  filtersChanged,
  paginationProps,
  ...passThroughProps
}) {
  const { t } = useTranslation();

  const hasSortedAnnotations = !!groupedAnnotations.length;

  function renderEmptyMessage() {
    if (filtersChanged) return <EmptyMessage.NoResults />;
    if (readingGroup === "me") return <EmptyMessage.TextNotAnnotatedByMe />;
    return <EmptyMessage.TextNotAnnotatedByGroup readingGroup={readingGroup} />;
  }

  return (
    <EntityCollection
      filterProps={filterProps}
      countProps={
        isEmpty(annotationsMeta)
          ? {}
          : {
              pagination: get(annotationsMeta, "pagination"),
              unit: t("glossary.note", {
                count: annotationsMeta?.pagination?.totalCount
              })
            }
      }
      BodyComponent={() => (
        <>
          {hasSortedAnnotations && (
            <Annotation.List.GroupedBySection
              handleVisitAnnotation={handleVisitAnnotation}
              groupedAnnotations={groupedAnnotations}
            />
          )}
          {!hasSortedAnnotations && renderEmptyMessage()}
        </>
      )}
      paginationProps={
        !hasSortedAnnotations
          ? {}
          : {
              pagination: get(annotationsMeta, "pagination"),
              ...paginationProps
            }
      }
      {...passThroughProps}
    />
  );
}

ReaderFullNotesEntityCollection.displayName =
  "Frontend.Entity.Collection.ReaderFullNotes";

ReaderFullNotesEntityCollection.propTypes = {
  readingGroup: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  annotations: PropTypes.array,
  annotationsMeta: PropTypes.object,
  filterProps: PropTypes.object,
  isFiltered: PropTypes.bool,
  paginationProps: PropTypes.object
};

export default ReaderFullNotesEntityCollection;